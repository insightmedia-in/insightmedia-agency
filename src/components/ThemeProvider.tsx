"use client";

import React from "react";
import { ThemeContextProvider } from "@/context/ThemeContext";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
};
