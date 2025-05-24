import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Users,
  ChefHat,
  Flame,
  Printer,
  Share2,
  Heart,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API_ENPOINTS, API_URL } from "@/constants/api";
import axios from "axios";
import type { IRecipe } from "@/types/api";
import toast from "react-hot-toast";

async function getRecipe(id: string) {
  try {
    const res = await axios.get(`${API_URL}${API_ENPOINTS.recipes}/${id}`);
    if (res.status !== 200) return null;
    return res.data as IRecipe;
  } catch (error) {
    throw new Error(error as string);
  }
}

const Recipe = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    getRecipe(params.id as string)
      .then((data) => setRecipe(data))
      .catch((err) => {
        console.error("Error fetching recipe:", err);
        toast.error("Failed to load recipe. Please try again later.");
      });
  }, [params.id]);

  if (!recipe) {
    navigate("/404");
    return;
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <main className="container mx-auto py-10 px-4">
      <Link
        to="/recipes"
        className="flex items-center text-sm mb-8 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to recipes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-black text-white">{recipe.cuisine}</Badge>
                {recipe.mealType.map((type: string, i: number) => (
                  <Badge key={i} variant="outline" className="border-black">
                    {type}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold">{recipe.name}</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="border-black">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-black">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-black">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="aspect-video overflow-hidden rounded-lg border border-gray-200 mb-6">
            <img
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.name}
              className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <Clock className="h-5 w-5 mb-2" />
              <p className="text-sm font-medium">Prep Time</p>
              <p className="text-sm">{recipe.prepTimeMinutes} mins</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <Flame className="h-5 w-5 mb-2" />
              <p className="text-sm font-medium">Cook Time</p>
              <p className="text-sm">{recipe.cookTimeMinutes} mins</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <Users className="h-5 w-5 mb-2" />
              <p className="text-sm font-medium">Servings</p>
              <p className="text-sm">{recipe.servings}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <ChefHat className="h-5 w-5 mb-2" />
              <p className="text-sm font-medium">Difficulty</p>
              <p className="text-sm">{recipe.difficulty}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-700">
              This delicious {recipe.name.toLowerCase()} is a{" "}
              {recipe.difficulty.toLowerCase()}-to-make {recipe.cuisine} dish,
              perfect for {recipe.mealType.join(" or ").toLowerCase()}. With
              only {totalTime} minutes of total preparation and cooking time,
              it's a great choice for a{" "}
              {recipe.difficulty === "Easy" ? "quick and simple" : "special"}{" "}
              meal.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Instructions</h2>
            <ol className="space-y-4 list-decimal list-inside">
              {recipe.instructions.map((instruction: string, i: number) => (
                <li key={i} className="text-gray-700">
                  <span className="font-medium text-black">Step {i + 1}:</span>{" "}
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag: string, i: number) => (
                <Badge key={i} variant="outline" className="border-black">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Ingredients</h2>
              <p className="text-sm text-gray-500 mb-4">
                For {recipe.servings} servings
              </p>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient: string, i: number) => (
                  <li key={i} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-black mr-3"></div>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Nutrition</h2>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="font-medium">Calories</span>
                  <span>{recipe.caloriesPerServing} kcal</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="font-medium">Protein</span>
                  <span>
                    {Math.round((recipe.caloriesPerServing * 0.15) / 4)} g
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="font-medium">Carbs</span>
                  <span>
                    {Math.round((recipe.caloriesPerServing * 0.5) / 4)} g
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="font-medium">Fat</span>
                  <span>
                    {Math.round((recipe.caloriesPerServing * 0.35) / 9)} g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Fiber</span>
                  <span>
                    {Math.round((recipe.caloriesPerServing * 0.05) / 2)} g
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                * Percent Daily Values are based on a 2,000 calorie diet. Your
                daily values may be higher or lower depending on your calorie
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default React.memo(Recipe);
