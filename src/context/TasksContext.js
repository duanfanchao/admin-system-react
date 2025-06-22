import { useReducer } from "react";
import { createContext } from 'react';
import tasksReducer from "../reducer/taskReducer";

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

const initialTasks = [
    { id: 1, name: "参观卡夫卡博物馆1", selected: false },
    { id: 2, name: "参观卡夫卡博物馆2", selected: true },
    { id: 3, name: "参观卡夫卡博物馆3", selected: false },
];

export function TasksProvider({ children }) {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}
