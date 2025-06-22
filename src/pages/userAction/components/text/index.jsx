import { useState } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import "./index.scss";
import { Select, Input, Button } from "antd";

function TextComponent({ props }) {
  const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light");
//   const [fontSize, setFontSize] = useLocalStorage("fontSize", 16);
  return (
    <div
      className="text-component"
      style={{
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
        // fontSize: `${fontSize}px`,
      }}
    >
      <h2>User Preferences</h2>
      <div>
        <label>主题: </label>
        <Select
          value={theme}
          style={{ width: 120 }}
          onChange={(value) => setTheme(value)}
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
          ]}
        />
      </div>
      {/* <div>
        <label>字体大小: {fontSize}px</label>
        <Input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </div> */}
      <Button type="primary" onClick={() => setTheme("light")}>
        重置主题
      </Button>
      <Button type="primary" onClick={removeTheme}>
        清除主题
      </Button>
    </div>
  );
}

export default TextComponent;
