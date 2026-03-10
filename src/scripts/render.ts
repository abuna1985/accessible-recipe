// src/scripts/render.ts

// PURPOSE: Renders validated Recipe data into the DOM.
// Uses DocumentFragment for performance — one DOM insertion per section.
// Uses queryElement() for safe DOM queries — no silent crashes.

import type { Recipe, Ingredient, NutritionItem } from "../types/recipe";
import { queryElement } from "./dom";

// ---------------------------------------------
// CREATE FUNCTIONS — build DOM elements, return them
// ---------------------------------------------

const createMetaItem = (label: string, value: string): HTMLLIElement => {
  const li = document.createElement("li");
  li.className = "recipe-meta__item";

  const labelSpan = document.createElement("span");
  labelSpan.className = "recipe-meta__label";
  labelSpan.textContent = label;

  const valueSpan = document.createElement("span");
  valueSpan.className = "recipe-meta__value";
  valueSpan.textContent = value;

  li.appendChild(labelSpan);
  li.appendChild(valueSpan);

  return li;
};

const createIngredientItem = (ingredient: Ingredient): HTMLLIElement => {
  const li = document.createElement("li");
  li.className = "ingredients__item";

  const quantity = ingredient.unit
    ? `${ingredient.quantity} ${ingredient.unit} `
    : `${ingredient.quantity} `;

  const quantitySpan = document.createElement("span");
  quantitySpan.className = "ingredients__quantity";
  quantitySpan.textContent = quantity;

  const nameSpan = document.createElement("span");
  nameSpan.className = "ingredients__name";
  nameSpan.textContent = ingredient.name;

  li.appendChild(quantitySpan);
  li.appendChild(nameSpan);

  if (ingredient.note) {
    const noteSpan = document.createElement("span");
    noteSpan.className = "ingredients__note";
    noteSpan.textContent = ` (${ingredient.note})`;
    li.appendChild(noteSpan);
  }

  return li;
};

const createInstructionItem = (step: string): HTMLLIElement => {
  const li = document.createElement("li");
  li.className = "instructions__item";
  li.textContent = step;
  return li;
};

const createNutritionItem = (item: NutritionItem): HTMLLIElement => {
  const li = document.createElement("li");
  li.className = "nutrition__item";

  const labelSpan = document.createElement("span");
  labelSpan.className = "nutrition__label";
  labelSpan.textContent = `${item.label}: `;

  const valueSpan = document.createElement("span");
  valueSpan.className = "nutrition__value";
  valueSpan.textContent = item.unit ? `${item.value}${item.unit}` : `${item.value}`;

  li.appendChild(labelSpan);
  li.appendChild(valueSpan);
  return li;
};

// ---------------------------------------------
// RENDER FUNCTIONS — query DOM, insert elements
// ---------------------------------------------

/**
 * Renders recipe metadata in the DOM: title, image, desciption, times, servings
 *
 * @param recipe - validated recipe data
 *
 */
const renderMeta = (recipe: Recipe): void => {
  // Query the DOM elements by id safely
  const titleElement = queryElement<HTMLHeadingElement>("recipeTitle");
  const descriptionElement = queryElement<HTMLParagraphElement>("recipeDescription");
  const imageElement = queryElement<HTMLImageElement>("recipeImage");
  const metaElement = queryElement<HTMLUListElement>("recipeMeta");

  if (titleElement.ok) {
    titleElement.data.textContent = recipe.title;
  }

  if (descriptionElement.ok && recipe.description) {
    descriptionElement.data.textContent = recipe.description;
  }

  if (imageElement.ok) {
    imageElement.data.src = recipe.image.src;
    imageElement.data.alt = recipe.image.alt;
  }

  if (metaElement.ok) {
    const ul = metaElement.data;
    ul.innerHTML = "";

    if (recipe.prepTime) {
      ul.appendChild(
        createMetaItem("Prep Time: ", `${recipe.prepTime.duration} ${recipe.prepTime.unit}`),
      );
    }

    if (recipe.cookTime) {
      ul.appendChild(
        createMetaItem("Cook Time: ", `${recipe.cookTime.duration} ${recipe.cookTime.unit}`),
      );
    }

    ul.appendChild(
      createMetaItem("Total Time", `${recipe.totalTime.duration} ${recipe.totalTime.unit}`),
    );
    ul.appendChild(createMetaItem("Servings: ", String(recipe.servings)));
  }
};

/**
 * Render ingredients in the DOM: list of ingredients
 * @param recipe - validated recipe data
 */
const renderIngredients = (recipe: Recipe): void => {
  const listEl = queryElement<HTMLUListElement>("ingredientList");
  if (!listEl.ok) return;

  const fragment = document.createDocumentFragment();
  recipe.ingredients.forEach((ingredient) => {
    fragment.appendChild(createIngredientItem(ingredient));
  });

  listEl.data.appendChild(fragment);
};

/**
 * Renders instruction steps in the DOM: list of steps
 * @param recipe - validated recipe data
 */
const renderInstructions = (recipe: Recipe): void => {
  const listEl = queryElement<HTMLOListElement>("instructionList");
  if (!listEl.ok) return;

  const fragment = document.createDocumentFragment();
  recipe.steps.forEach((step) => {
    fragment.appendChild(createInstructionItem(step));
  });

  listEl.data.appendChild(fragment);
};

/**
 * Renders nutrition info into the DOM: list of nutrition items
 * Skips render entirely if nutrition data is absent
 * @param recipe - validated recipe data
 */
const renderNutrition = (recipe: Recipe): void => {
  if (!recipe.nutrition) return;

  const listEl = queryElement<HTMLUListElement>("nutritionList");
  if (!listEl.ok) return;

  const fragment = document.createDocumentFragment();
  recipe.nutrition.forEach((item) => {
    fragment.appendChild(createNutritionItem(item));
  });

  listEl.data.appendChild(fragment);
};

// ---------------------------------------------
// ENTRY POINT
// ---------------------------------------------

/**
 * Main render entry point. Populates the entire recipe page.
 * @param recipe - validated Recipe object from validateRecipe
 */
export const renderRecipe = (recipe: Recipe): void => {
  renderMeta(recipe);
  renderIngredients(recipe);
  renderInstructions(recipe);
  renderNutrition(recipe);
};
