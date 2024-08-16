import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState({});

  const value = {
    editTask,
    setEditTask,
    tasks,
    setTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);

  return context;
};
