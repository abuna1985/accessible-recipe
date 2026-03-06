export type TimeUnit = "minutes" | "hours"

export interface Time {
  duration: number
  unit: TimeUnit
}

export const UNITS = [
  "cup",
  "tbsp",
  "tsp",
  "fl_oz",
  "ml",
  "l",
  "oz",
  "lb",
  "g",
  "kg",
  "pinch",
  "dash",
] as const

export type Unit = typeof UNITS[number]

export interface Ingredient {
  quantity: number
  unit?: Unit
  name: string
  note?: string
}

export interface NutritionItem {
  label: string
  value: number
  unit?: Unit
}

export interface Recipe {
  title: string
  description?: string
  servings: number
  totalTime: Time
  prepTime?: Time
  cookTime?: Time
  ingredients: Ingredient[]
  steps: string[]
  nutrition?: NutritionItem[]
}
