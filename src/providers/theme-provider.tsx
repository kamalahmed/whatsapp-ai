"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * Renders a theme provider component that wraps the given children.
 * @param children - The child elements to render.
 * @param props - Additional props to pass to the theme provider.
 */
export function ThemeProvider({ children,...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}