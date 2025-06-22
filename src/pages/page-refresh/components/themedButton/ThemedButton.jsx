import { useContext } from "react";
import ThemeContext from "../../../../context/ThemeContext";

export default function ThemedButton() {
  // 使用 useContext 订阅 ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log("ThemedButton 渲染，当前主题：", theme);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      {theme === "light" ? "切换到深色模式" : "切换到浅色模式"}
    </button>
  );
}
