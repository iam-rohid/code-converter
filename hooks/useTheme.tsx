import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

const ThemeKey = "THEME";

const ThemeProvider = (props: { children: JSX.Element }) => {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    if (!window || isDark === null) return;
    document.documentElement.classList.remove("dark");
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(ThemeKey, "dark");
    } else {
      localStorage.setItem(ThemeKey, "light");
    }
  }, [isDark]);

  useEffect(() => {
    const theme = localStorage.getItem(ThemeKey);
    const darkMode =
      theme === null
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : theme === "dark";
    setIsDark(darkMode);
  }, []);

  const value = {
    isDark,
    setIsDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
