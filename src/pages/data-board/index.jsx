import { useState, lazy } from "react";
import { Button } from "antd";
const TestComponent = lazy(() => import("./components/test-component/index"));

function DataBoard() {
  const [state, setState] = useState(false);
  const onRegister = () => {
    setState(!state);
  };
  const renderTest = () => {
    if (state) {
      return <TestComponent></TestComponent>;
    }
    return null;
  };
  return (
    <div>
      <h1>数据面板</h1>
      <Button type="primary" onClick={onRegister}>
        展示测试组件
      </Button>
      {renderTest()}
    </div>
  );
}

export default DataBoard;
