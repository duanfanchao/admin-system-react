import React, { useState } from "react";
import ThemeContext from "../../../../context/ThemeContext";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 当 theme 或 toggleTheme 变化时，所有订阅的组件会重新渲染
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
