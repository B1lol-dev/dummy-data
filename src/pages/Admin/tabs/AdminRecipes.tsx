"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Search, Plus, Edit, Trash2, Eye, Star, EyeClosed } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { API_ENPOINTS, API_URL } from "@/constants/api";
import toast from "react-hot-toast";
import TabLoader from "../components/TabLoader";
import type { IRecipe } from "@/types/api";

const getDifficultyBadge = (difficulty: string) => {
  const variants = {
    Easy: "bg-green-100 text-green-800 border-green-200",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Hard: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    variants[difficulty as keyof typeof variants] ||
    "bg-gray-100 text-gray-800 border-gray-200"
  );
};

const AdminRecipes = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [originalRecipes, setOriginalRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}${API_ENPOINTS.recipes}?limit=0`)
      .then((res) => {
        setRecipes(res.data.recipes);
        setOriginalRecipes(res.data.recipes);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        toast.error("Failed to load recipes");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: number) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    toast.success("Recipe deleted successfully");
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setRecipes(originalRecipes);
      return;
    }

    setRecipes((prev) =>
      prev.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  if (loading) {
    return <TabLoader />;
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Recipes</h1>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Recipe Management</h2>
            <p className="text-gray-600">Manage your recipe collection</p>
          </div>
          <Button className="bg-black hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Add Recipe
          </Button>
        </div>

        <Card className="border border-gray-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recipes ({recipes.length})</CardTitle>
                <CardDescription>Manage your recipe collection</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search recipes..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    handleSearch();
                  }}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipe</TableHead>
                  <TableHead>Cuisine</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Servings</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Calories</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipes.map((recipe) => (
                  <RecipeTable
                    recipe={recipe}
                    key={recipe.id}
                    onDelete={() => handleDelete(recipe.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
};

export default AdminRecipes;

function RecipeTable({
  recipe,
  onDelete,
}: {
  recipe: IRecipe;
  onDelete?: () => void;
}) {
  const [hide, setHide] = useState(false);

  const toggleHide = () => {
    if (hide) {
      setHide(false);
      toast.success(`Recipe "${recipe.name}" is now visible`);
    } else {
      setHide(true);
      toast.success(`Recipe "${recipe.name}" is now hidden`);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          <img
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.name}
            className="w-10 h-10 rounded-lg object-cover grayscale"
          />
          <div>
            <div className="font-medium">{recipe.name}</div>
            <div className="text-sm text-gray-500">
              {recipe.mealType.join(", ")}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="border-black">
          {recipe.cuisine}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className={getDifficultyBadge(recipe.difficulty)}>
          {recipe.difficulty}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div>Prep: {recipe.prepTimeMinutes}m</div>
          <div>Cook: {recipe.cookTimeMinutes}m</div>
        </div>
      </TableCell>
      <TableCell>{recipe.servings}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span>{recipe.rating}</span>
          <span className="text-sm text-gray-500 ml-1">
            ({recipe.reviewCount})
          </span>
        </div>
      </TableCell>
      <TableCell>{recipe.caloriesPerServing} cal</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={toggleHide}>
            {!hide ? (
              <Eye className="size-4" />
            ) : (
              <EyeClosed className="size-4" />
            )}
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
