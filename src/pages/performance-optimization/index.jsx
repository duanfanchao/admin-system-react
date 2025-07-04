import { useState, useMemo, useCallback, useTransition } from "react";
import { Button, Divider } from "antd";
import ReactMemo from "./components/react-memo/index";

function PerformanceOptimization() {
  // 6.React.memo
  const [count, setCount] = useState(0);
  const addF = useCallback(() => setCount(count + 1), [count]);
  const [userId, setUserId] = useState("1");

  // 7.useMemo
  //   const calculateCount = (val) => {
  //     console.log('calculateCount执行');
  //     return val * 2;
  //   };
  const calculateCount = (val) => {
    console.log("calculateCount执行");
    return val * 2;
  };
  const [value, setValue] = useState(0);
  // 缓存num值
  const num = useMemo(() => calculateCount(value), [value]);
  const changeValue = useCallback(() => {
    setValue(value + 1);
  }, [value]);

  // 8.useCallback
  //   const handleClick = () => {
  //     console.log("handleClick", userId);
  //   };
  const handleClick = useCallback(() => {
    console.log("handleClick", userId);
  }, [userId]);

  // 9.useTransition

  // 示例数据
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();
  // 筛选逻辑
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase())
  );
  // 处理输入框更新
  const handleChange = (e) => {
    const value = e.target.value;

    // 通过 startTransition 包裹低优先级更新
    startTransition(() => {
      setFilter(value);
    });
  };
  return (
    <div>
      <h1>性能优化</h1>
      <Divider></Divider>
      <h2>组件设计优化</h2>
      <Divider></Divider>
      <h3>1.组件拆分与隔离</h3>
      <div>
        问题：大组件状态更新会导致整个子树渲染。
        解法：将频繁更新的部分拆分为独立小组件，利用 React 的局部更新特性。
      </div>
      <h3>2.合理使用 Key</h3>
      <Divider></Divider>
      <h2>状态管理优化</h2>
      <Divider></Divider>
      <h3>3.状态提升与下降</h3>
      <div>
        提升：将多个子组件共用的状态提到父组件。
        下降：将只被单个组件使用的状态下放到该组件。
      </div>
      <h3>4.使用 Context 分层</h3>
      <div>
        问题：单一 Context 变化导致所有订阅组件渲染。 解法：按业务拆分多个
        Context。
      </div>
      <h3>5.状态合并</h3>
      <div>
        问题：多次连续 setState 触发多次渲染。 解法：合并状态更新（React 18
        自动批处理，旧版本需手动优化）
      </div>
      <Divider></Divider>
      <h2>渲染控制优化</h2>
      <h3>6.React.memo (函数组件：React.memo 是一个高阶组件（HOC）)</h3>
      <div>作用：缓存组件，在 props 未变化时跳过渲染。（浅比较）</div>
      <span>数字：{count}</span>
      <Button type="primary" size="small" onClick={addF}>
        +1
      </Button>
      <ReactMemo userId={userId}></ReactMemo>
      <Divider></Divider>
      <h3>7.useMemo (函数组件)：缓存计算结果，避免重复计算</h3>
      <span>数字：{num}</span>
      <Button type="primary" size="small" onClick={changeValue}>
        X2
      </Button>
      <Divider></Divider>
      <h3>7.useCallback：缓存函数，避免子组件因函数引用变化重新渲染</h3>
      <p>Count: {count}</p>
      <ReactMemo userId={userId} onClick={handleClick}></ReactMemo>
      <Divider></Divider>
      <h3>8.代码分割 (React.lazy + Suspense): 按需加载组件，减少首屏资源。</h3>
      <Divider></Divider>
      <h3>
        9.useTransition /
        startTransition：标记非紧急更新（如搜索输入），避免阻塞高优先级渲染。
      </h3>
      <div>
        <input
          type="text"
          value={filter}
          onChange={handleChange}
          placeholder="Filter items"
        />
        <div>
          {isPending ? (
            <p>Loading...</p> // 当正在筛选时，显示加载状态
          ) : (
            <ul>
              {filteredItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PerformanceOptimization;
