import { useState, useRef, useMemo } from "react";
import MyInput from "./components/inputComponent";
import { Divider } from "antd";
import Playground from "./components/playground/index";
import { useMouseMove } from '../../hooks/useMouseMove';
import './index.scss';

const initData = [
  {
    name: "张三",
    age1: 18,
    age2: 10,
  },
  {
    name: "李四",
    age1: 38,
    age2: 10,
  },
];

function Mechanism() {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const [data, setData] = useState(initData);
  const handleClick = () => {
    inputRef.current.focus();
  };

  const calculateTotalAge = (array) => {
    return array.map((ele) => ({ ...ele, totalAge: ele.age1 + ele.age2 }));
  };
  //   const newData = calculateTotalAge(data);
  const newData = useMemo(() => calculateTotalAge(data), [data]);

  const [show, setShow] = useState(false);
  const addF = () => {
    setData([...data, { name: "王五", age1: 18, age2: 9 }]);
  };
  const [position, mouseProps] = useMouseMove({ x: 0, y: 0 })
  return (
    <>
      {/* <MyInput ref={inputRef} count={count} />
      <button onClick={handleClick}>聚焦输入框</button>
      <button onClick={() => setCount(count + 1)}>+1</button> */}

      {/* <Divider></Divider>

      <button onClick={() => setShow(!show)}>
        {show ? "卸载" : "挂载"} 组件
      </button>
      {show && <hr />}
      {show && <Playground />} */}
      <Divider></Divider>

      <h1>订阅外部 store </h1>
      <Divider></Divider>
      <h1>useMemo</h1>
      <button onClick={addF}>新增王五</button>
      {newData.map((ele) => {
        return (
          <h2 key={ele.name}>
            我的名字是：{ele.name},我的年龄是：{ele.totalAge}
          </h2>
        );
      })}
      <Divider></Divider>
      <h1>自定义Hook-鼠标position</h1>
      <div className="mouse-container" {...mouseProps}>
        <div className="circle" style={{ top: position.y, left: position.x }}></div>
      </div>
    </>
  );
}

export default Mechanism;
