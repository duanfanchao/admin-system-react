import { useState, useEffect, useContext } from "react";
import { Checkbox, Button, Input } from "antd";
import {
  TasksContext,
  TasksDispatchContext,
} from "../../../../context/TasksContext";
import "./index.scss";

// function TaskList({ tasks, handleDeleteTask, handleEditTask }) {

// reducer结合context
function TaskList() {
  const tasks = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);

  const [taskList, setTaskList] = useState(tasks);
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onCheckedChange = (val, e) => {
    dispatch({
      type: "changed",
      task: { ...val, selected: e.target.checked },
    });
    // handleEditTask({ ...val, selected: e.target.checked });
  };
  const deleteF = (val) => {
    dispatch({
      type: "deleted",
      id: val.id,
    });
    // handleDeleteTask(val.id);
  };
  const editF = (val) => {
    setText(val.name);
    setTaskList(
      taskList.map((ele) => {
        if (ele.id === val.id) {
          return { ...ele, isEdit: true };
        }
        return ele;
      })
    );
  };
  const saveF = (val) => {
    dispatch({
      type: "changed",
      task: { ...val, name: text },
    });
    // handleEditTask({ ...val, name: text });
  };
  const cancelF = (val) => {
    setTaskList(
      taskList.map((ele) => {
        if (ele.id === val.id) {
          return { ...ele, isEdit: false };
        }
        return ele;
      })
    );
  };
  useEffect(() => {
    setTaskList(
      tasks.map((ele) => ({
        ...ele,
        isEdit: ele.hasOwnProperty("isEdit") ? ele.isEdit : false,
      }))
    );
  }, [tasks]);
  const renderList = () => {
    return taskList.map((ele) => {
      return (
        <div className="item-row" key={ele.id}>
          {ele.isEdit ? (
            <Input value={text} onChange={onChange} />
          ) : (
            <Checkbox
              checked={ele.selected}
              onChange={(e) => onCheckedChange(ele, e)}
            >
              {ele.name}
            </Checkbox>
          )}

          {ele.isEdit ? (
            <Button
              type="primary"
              className="margin-0-4"
              onClick={() => saveF(ele)}
            >
              保存
            </Button>
          ) : (
            <Button
              type="primary"
              className="margin-0-4"
              onClick={() => editF(ele)}
            >
              编辑
            </Button>
          )}
          {ele.isEdit ? (
            <Button type="primary" onClick={() => cancelF(ele)}>
              取消
            </Button>
          ) : (
            <Button type="primary" onClick={() => deleteF(ele)}>
              删除
            </Button>
          )}
        </div>
      );
    });
  };
  return <div className="task-list">{renderList()}</div>;
}

export default TaskList;
