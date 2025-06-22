import { useContext } from "react";
import ThemeContext from "../../../../context/ThemeContext";

function Count({ count }) {
  const { theme } = useContext(ThemeContext);

  console.log("Count组件渲染");
  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      数字：{count}
    </div>
  );
}

export default Count;
