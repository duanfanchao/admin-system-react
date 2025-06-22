import { useState, useEffect } from "react";
import { Button, Divider } from "antd";
import Count from "./components/count/index";
import ThemeProvider from "./components/themeProvider/ThemeProvider";
import ThemedButton from "./components/themedButton/ThemedButton";

function PageRefresh() {
  // 1.State 变化
  const [flag, setFlag] = useState(false);
  const changeFlag = () => setFlag(!flag);
  console.log("标志位flag改变");

  //   2.Props 变化
  const [count, setCount] = useState(0);
  const addF = () => setCount(count + 1);

  // 5.Hooks 的依赖项变化--父组件向子组件传参，useEffect的依赖项是父组件向子组件传入的参数

  // Key 属性变化
  const [key, setKey] = useState(0);
  console.log("Key 属性变化");
  const resetComponent = () => {
    setKey((prev) => prev + 1); // 修改 key 会销毁并重建组件
  };
  return (
    // 3.Context 变化
    <ThemeProvider>
      <div>
        <h1>组件重新渲染的条件</h1>

        <h2>1.State 变化 --&gt; 4.父组件重新渲染</h2>
        <div>标志位：{flag}</div>
        <Button type="primary" onClick={changeFlag} size="small">
          改变flag
        </Button>

        <Divider></Divider>

        <h2>2.Props 变化</h2>
        <Count count={count}></Count>
        <Button type="primary" onClick={addF} size="small">
          +1
        </Button>

        <Divider></Divider>

        <h2>3.Context 变化</h2>
        <ThemedButton></ThemedButton>

        <Divider></Divider>

        <h2>5.Hooks 的依赖项变化</h2>
        <span>
          父组件向子组件传参，useEffect的依赖项是父组件向子组件传入的参数
        </span>
        <Divider></Divider>

        <h2>6.强制更新</h2>
        <span>
          类组件通过forceUpdate()实现；函数组件通过 修改无意义状态，或利用 key
          重置组件实现
        </span>
        <Divider></Divider>

        <h2>7.Key 属性变化</h2>
        <div key={key}>
          <p>组件已渲染次数：{key + 1}</p>
          <Button type="primary" onClick={resetComponent} size="small">
            重置组件（通过 key）
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default PageRefresh;
