import "./styles/base.css";

import { validateRecipe } from "./scripts/validate";
import { renderRecipe } from "./scripts/render";
import recipeData from "./data/recipe.json";

const result = validateRecipe(recipeData);

if (!result.ok) {
  console.error("Invalid recipe data:", result.error);
} else {
  renderRecipe(result.data);
}
