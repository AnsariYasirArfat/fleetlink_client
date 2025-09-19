import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to ISO string for API calls
 */
export function formatDateForApi(date: Date): string {
  return date.toISOString();
}

/**
 * Format date for display
 */
export function formatDateForDisplay(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}



