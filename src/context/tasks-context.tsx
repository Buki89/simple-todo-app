import { createContext, FC, useContext, useReducer } from "react";
import { ContextProps } from "../types";
import { reducer } from "./context-reducer";

export const TasksContext = createContext<ContextProps | undefined>(undefined);

TasksContext.displayName = "Tasks Context";

const useTaskContext = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

const TaskProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [], undefined);
  console.log("state", state);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export { TaskProvider, useTaskContext };
