import { siteConfig } from "@/data/site-config";

/**
 * Format a numeric amount using the application's central currency configuration.
 * Handles both decimal dollars ($249.99) and edge cases cleanly.
 */
export function formatCurrency(amount: number): string {
  if (typeof amount !== "number" || isNaN(amount)) {
    return `${siteConfig.currency.symbol}0.00`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: siteConfig.currency.code,
    minimumFractionDigits: siteConfig.currency.decimalPlaces,
    maximumFractionDigits: siteConfig.currency.decimalPlaces,
  }).format(amount);
}
