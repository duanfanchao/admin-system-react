import { useState } from "react";
import { Button, Divider } from "antd";

function CustomHook() {
  const [state, setstate] = useState(0);

  return (
    <div>
      <h1>自定义hook的注意事项</h1>
      <p>
        1.命名规范-必须使用 use 前缀,React 依赖命名约定识别 Hook，ESLint
        规则会据此检查 Hook 的调用顺序。
      </p>
      <Divider></Divider>
      <p>
        2.只能在函数组件的顶层调用 Hook。不要在循环、条件判断或子函数中调用。
        确保总是在你的 React 函数的最顶层调用 Hook。
      </p>
      <Divider></Divider>
      <p>3.状态隔离: 每个组件实例拥有独立状态</p>
      <Divider></Divider>
      <p>
        4.依赖项处理: 正确处理 Hook 依赖数组(在 useEffect、useMemo、useCallback
        中明确声明所有依赖项，避免闭包陷阱。)
      </p>
      <Divider></Divider>
      <p>
        5.性能优化: 避免不必要的重新渲染(返回对象或函数时，使用
        useMemo/useCallback 缓存，防止父组件无意义更新。)
      </p>
      <Divider></Divider>
      <p>
        6.副作用清理: 清理 useEffect
        中的副作用(如事件监听、定时器、订阅等，需返回清理函数。)
      </p>
      <Divider></Divider>
      <p>
        7.文档与示例: 提供清晰的文档注释,说明 Hook
        的功能、参数和返回值，方便团队协作。
      </p>
      <Divider></Divider>
      <p>
        8.避免过度抽象: 仅在逻辑复用时创建 Hook
        简单逻辑直接写在组件内，避免不必要的抽象层。
      </p>

      <h2>react：要求hook每次渲染时执行的数量合顺序必须是一致的</h2>
    </div>
  );
}

export default CustomHook;
