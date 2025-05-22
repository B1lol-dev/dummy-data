import React from "react";
import type { IRecipe } from "@/types/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, Flame } from "lucide-react";

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  return (
    <Card
      key={recipe.id}
      className="border border-gray-200 overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-48">
        <img
          src={recipe.image || "/placeholder.svg?height=200&width=300"}
          alt={recipe.name}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          loading="lazy"
        />
        <Badge className="absolute top-2 right-2 bg-black text-white">
          {recipe.cuisine}
        </Badge>
        {recipe.mealType && recipe.mealType.length > 0 && (
          <Badge className="absolute top-2 left-2 bg-gray-800 text-white">
            {recipe.mealType[0]}
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{recipe.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-4 gap-2 text-xs text-center mb-4">
          <div className="flex flex-col items-center">
            <Clock className="h-4 w-4 mb-1" />
            <span>Prep: {recipe.prepTimeMinutes}m</span>
          </div>
          <div className="flex flex-col items-center">
            <Flame className="h-4 w-4 mb-1" />
            <span>Cook: {recipe.cookTimeMinutes}m</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-4 w-4 mb-1" />
            <span>{recipe.servings} serv</span>
          </div>
          <div className="flex flex-col items-center">
            <ChefHat className="h-4 w-4 mb-1" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs font-medium mb-1">Ingredients:</p>
          <p className="text-xs text-gray-600 line-clamp-2">
            {recipe.ingredients.slice(0, 4).join(", ")}
            {recipe.ingredients.length > 4 ? ", ..." : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs border-black"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs">
          <span>{recipe.caloriesPerServing} cal/serving</span>
          <span className="flex items-center">
            ★ {recipe.rating.toFixed(1)} ({recipe.reviewCount})
          </span>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-200 bg-gray-50">
        <button className="w-full text-center font-medium hover:underline">
          View Recipe
        </button>
      </CardFooter>
    </Card>
  );
};

export default React.memo(RecipeCard);
