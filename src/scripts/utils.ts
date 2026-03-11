// src/scripts/utils.ts

/**
 * Converts a decimal quantity to a human readable fraction string.
 * Used for display only — JSON stores precise decimal for scaler math.
 *
 * @param value - decimal number from recipe data
 * @returns human readable string
 *
 * @example
 * formatQuantity(0.333) // "⅓"
 * formatQuantity(0.5)   // "½"
 * formatQuantity(1.25)  // "1¼"
 * formatQuantity(2)     // "2"
 */
export const formatQuantity = (value: number): string => {
  const fractions: Record<number, string> = {
    0.125: "⅛",
    0.25: "¼",
    0.333: "⅓",
    0.5: "½",
    0.667: "⅔",
    0.75: "¾",
  };

  const whole = Math.floor(value);
  const decimal = Math.round((value - whole) * 1000) / 1000;

  const fraction = fractions[decimal];

  if (whole === 0) return fraction ?? `${value}`;
  if (!fraction) return `${value}`;
  return `${whole}${fraction}`;
};
