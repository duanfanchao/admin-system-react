import { useState } from "react";
import { Button, Divider } from "antd";

function DevelopmentStandard() {
  const [state, setstate] = useState();

  return (
    <div>
      <h1>react开发规范</h1>
      <Divider></Divider>
      <h2>组件开发规范</h2>
      <div>1.函数组件优先：使用 React Hooks 替代 Class 组件</div>
      <div>2.单一职责：每个组件只做一件事</div>
      <div>3.受控组件：优先通过 props 控制组件行为</div>
    </div>
  );
}

export default DevelopmentStandard;
