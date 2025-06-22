import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../index";
import { Button } from "antd";

function CardSon({ props }) {
  const { info, setInfo } = useContext(UserContext);
  console.log("孙子组件-组件渲染");
  useEffect(() => {
    // 相当于 componentDidMount
    console.log("孙子组件-组件挂载");
    // const timer = setInterval(() => console.log("定时器运行"), 1000);
    return () => {
      // 相当于 componentWillUnmount
      console.log("孙子组件-组件卸载");
      //   clearInterval(timer);
    };
  }, []);
  const changeInfo = () => {
    setInfo({ name: "王五", age: 3 });
  };
  return (
    <div>
      <h3>卡片组件的子组件</h3>
      <h6>姓名: {info.name}</h6>
      <h6>年龄: {info.age}</h6>
      <Button type="primary" onClick={changeInfo}>变更Info</Button>
    </div>
  );
}

export default CardSon;
