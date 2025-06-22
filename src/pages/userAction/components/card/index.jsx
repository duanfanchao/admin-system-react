import { useState, useEffect, useContext } from "react";
import CardSon from "../cardSon/index";
import { Divider, Button } from "antd";
import { UserContext } from "../../index";

function CardComponent(props) {
  const { data } = props;
  const { info, setInfo } = useContext(UserContext);
  console.log("子组件-组件渲染", data);
  useEffect(() => {
    // 相当于 componentDidMount
    console.log("子组件-组件挂载");
    // const timer = setInterval(() => console.log("定时器运行"), 1000);
    return () => {
      // 相当于 componentWillUnmount
      console.log("子组件-组件卸载");
      //   clearInterval(timer);
    };
  }, []);
  const changeUse = () => {
    setInfo({ name: "李四", age: 2 });
  };
  return (
    <div>
      <h1>卡片组件</h1>
      <h2>数字：{data}</h2>
      <h5>姓名: {info.name}</h5>
      <h5>年龄: {info.age}</h5>
      <Divider />
      <Button type="primary" onClick={changeUse}>
        变更Info
      </Button>
      <CardSon />
    </div>
  );
}

export default CardComponent;
