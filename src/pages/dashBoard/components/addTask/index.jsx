import { useState, useContext } from "react";
import { Input, Button } from "antd";
import "./index.scss";
import { TasksDispatchContext } from "../../../../context/TasksContext";

// function AddTask({ handleAddTask }) {
let nextId = 4;

// reducer结合context
function AddTask() {
  const dispatch = useContext(TasksDispatchContext);
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };
  const addF = () => {
    // handleAddTask(text);
    dispatch({
      type: "added",
      id: nextId++,
      name: text,
    });
    setText("");
  };
  return (
    <div className="add-task">
      <Input placeholder="请输入" value={text} onChange={onChange} />
      <Button type="primary" className="margin-left-4" onClick={addF}>
        添加
      </Button>
    </div>
  );
}

export default AddTask;
