import React, { useEffect, useState } from "react";
import type { IRecipe } from "@/types/api";
import Container from "@/components/helpers/Container";
import RecipeCardSkeleton from "./components/skeleon/RecipeCardSkeleton";
import RecipeCard from "./components/RecipeCard";

const Recipes = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("https://dummyjson.com/recipes?limit=8");
        const data = await response.json();
        setRecipes(data.recipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill("")
              .map((_, index) => (
                <RecipeCardSkeleton key={index} />
              ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default React.memo(Recipes);
