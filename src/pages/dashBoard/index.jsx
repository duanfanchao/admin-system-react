import { useState, useReducer } from "react";
import { Button, Divider } from "antd";
import { useImmer } from "use-immer";
import AddTask from "./components/addTask/index";
import TaskList from "./components/taskList/index";
// import tasksReducer from "../../reducer/taskReducer";
// import { useImmerReducer } from "use-immer";
// import { TasksContext, TasksDispatchContext } from "../../context/TasksContext";
import { TasksProvider } from "../../context/TasksContext";

// const initialTasks = [
//   { id: 1, name: "参观卡夫卡博物馆1", selected: false },
//   { id: 2, name: "参观卡夫卡博物馆2", selected: true },
//   { id: 3, name: "参观卡夫卡博物馆3", selected: false },
// ];
// let nextId = 4;

export default function Dashboard() {
  const [num, setNum] = useState(0);
  const [person, updatePerson] = useImmer({
    name: "张三",
    artwork: {
      title: "Blue Nana",
      city: "Hamburg",
      image: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  });
  const changeNum = () => {
    setNum((num) => num + 1);
    setNum((num) => num + 1);
    setNum((num) => num + 1);
  };
  function handleNameChange(e) {
    updatePerson((draft) => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson((draft) => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson((draft) => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson((draft) => {
      draft.artwork.image = e.target.value;
    });
  }

  //   const [tasks, setTasks] = useState(initialTasks);
  //   const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  //   useImmerReducer实现
  //   const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);
  //   const handleAddTask = (text) => {
  //     dispatch({
  //       type: "added",
  //       id: nextId++,
  //       name: text,
  //     });
  //   };
  //   const handleDeleteTask = (val) => {
  //     dispatch({
  //       type: "deleted",
  //       id: val.id,
  //     });
  //   };
  //   const handleEditTask = (val) => {
  //     dispatch({
  //       type: "changed",
  //       task: val,
  //     });
  //   };

  //   reducer结合context实现
  //   const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <div className="adshboard">
      <>
        <h1>欢迎使用管理系统</h1>
        <h3>数字: {num}</h3>
        <Button type="primary" onClick={changeNum}>
          改变数字
        </Button>
        <Divider></Divider>
        <h2>use-immer的使用</h2>
        <label>
          Name:
          <input value={person.name} onChange={handleNameChange} />
        </label>
        <label>
          Title:
          <input value={person.artwork.title} onChange={handleTitleChange} />
        </label>
        <label>
          City:
          <input value={person.artwork.city} onChange={handleCityChange} />
        </label>
        <label>
          Image:
          <input value={person.artwork.image} onChange={handleImageChange} />
        </label>
        <p>
          <i>{person.artwork.title}</i>
          {" by "}
          {person.name}
          <br />
          (located in {person.artwork.city})
        </p>
        <img src={person.artwork.image} alt={person.artwork.title} />
      </>

      <Divider></Divider>
      {/* <h1>布拉格的行程安排</h1> */}
      {/* <AddTask handleAddTask={handleAddTask}></AddTask>
      <TaskList
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
      ></TaskList> */}
      <Divider></Divider>

      <h1>布拉格的行程安排</h1>

      {/* <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
          <AddTask></AddTask>
          <TaskList></TaskList>
        </TasksDispatchContext.Provider>
      </TasksContext.Provider> */}

      <TasksProvider>
        <AddTask></AddTask>
        <TaskList></TaskList>
      </TasksProvider>
    </div>
  );
}
