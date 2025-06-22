import { useState, useEffect, createContext } from "react";
import { Table, Button, Input, message } from "antd";
import CardComponent from "./components/card/index";
import TextComponent from "./components/text/index";
import "./index.scss";

export const UserContext = createContext();

function UserAction() {
  const [num, setNum] = useState(0);
  const [info, setInfo] = useState({ name: "张三", age: 1 });
  console.log("父组件-组件渲染");
  useEffect(() => {
    // 相当于 componentDidMount
    console.log("父组件-组件挂载");
    // const timer = setInterval(() => console.log("定时器运行"), 1000);
    return () => {
      // 相当于 componentWillUnmount
      console.log("父组件-组件卸载");
      //   clearInterval(timer);
    };
  }, []);
  const change = () => {
    setNum(num + 1);
  };
  return (
    <div className="user-action">
      <div className="form_div">
        <Button type="primary" onClick={change}>
          变更
        </Button>
      </div>
      <div className="middle-table">
        <UserContext.Provider value={{ info, setInfo }}>
          <CardComponent data={num}></CardComponent>
        </UserContext.Provider>
      </div>

      <div className="pagination_div">
        <TextComponent></TextComponent>
      </div>
    </div>
  );
}

export default UserAction;
