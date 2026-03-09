import { z } from "zod";
import { UNITS, type Recipe } from "../types/recipe";

const TimeSchema = z.object({
  duration: z.number().positive(),
  unit: z.enum(["minutes", "hours"]),
});

const IngredientSchema = z.object({
  quantity: z.number().positive(),
  unit: z.enum(UNITS).optional(),
  name: z.string().min(1),
  note: z.string().optional(),
});

const NutritionItemSchema = z.object({
  label: z.string().min(1),
  value: z.number().positive(),
  unit: z.enum(UNITS).optional(),
});

const RecipeImageSchema = z.object({
  src: z.url(),
  alt: z.string().min(1),
});

const RecipeSchema = z.object({
  title: z.string().min(1),
  image: RecipeImageSchema,
  description: z.string().min(1),
  servings: z.number().positive(),
  totalTime: TimeSchema,
  prepTime: TimeSchema.optional(),
  cookTime: TimeSchema.optional(),
  ingredients: z.array(IngredientSchema),
  steps: z.array(z.string().min(1)).min(1),
  nutrition: z.array(NutritionItemSchema).optional(),
});

// Result <T>: Generic type that forces to handle success and error cases
export type Result<T> = { success: true; data: T } | { success: false; error: string };

/**
 * Validates raw JSON data against the RecipeSchema at runtime.
 *
 * @param data - unkown data fro mJSON import or external source
 * @returns Result<Recipe> - success with typed data
 * @error Result<string> - error with error message
 */
export function validateRecipe(data: unknown): Result<Recipe> {
  const result = RecipeSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
