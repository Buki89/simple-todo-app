import { Action, ActionType, State, Task } from "../types";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../firebase";
import { ref, set, remove, update } from "firebase/database";

const AddTask = (state: Task[], payload: string): Task[] => {
  const uid = auth.currentUser?.uid;
  console.log("Reducer - uid", uid);
  const createdAt = new Date().toLocaleString();

  const newState = [...state];

  const newTask: Task = {
    taskName: payload,
    id: uuidv4(),
    completed: false,
    createdAt: createdAt,
  };

  const writeTask = async () => {
    try {
      if (uid) {
        await set(ref(db, `users/${uid}/${newTask.id}`), newTask);
        console.log("ADD TASK TO DATABASE");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("uid reduces", uid);
  writeTask();

  newState.push(newTask);

  return newState;
};

const RemoveTask = (state: State, payload: string): State => {
  const uid = auth.currentUser?.uid;

  const RemoveTask = async () => {
    try {
      await remove(ref(db, `users/${uid}/${payload}`));
      console.log("TASK REMOVED FROM DATABASE");
    } catch (error) {
      console.log("error", error);
    }
  };

  RemoveTask();

  return state.filter((task: Task) => task.id !== payload);
};

const EditTask = (state: State, payload: Partial<Task>): State => {
  const uid = auth.currentUser?.uid;

  const updateTask = async () => {
    try {
      await update(ref(db, `users/${uid}/${payload.id}`), {
        ...payload,
      });
      console.log("TASK IN DATABASE UPDATED", { ...payload });
    } catch (error) {
      console.log("error", error);
    }
  };

  updateTask();

  const newState = state.map((task: Task) => {
    if (task.id === payload.id) {
      return {
        id: task.id,
        completed:
          payload.completed !== undefined ? payload.completed : task.completed,
        createdAt: task.createdAt,
        taskName: payload.taskName ? payload.taskName : task.taskName,
      };
    }

    return task;
  });
  return newState;
};

const FetchTasks = (payload: State): State => payload;

export type Reducer = (state: State, action: Action) => State;

export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case ActionType.addTask:
      return AddTask(state, action.payload);
    case ActionType.removeTask:
      return RemoveTask(state, action.payload);
    case ActionType.editTask:
      return EditTask(state, action.payload);
    case ActionType.fetchTasks:
      return FetchTasks(action.payload);
    default:
      return state;
  }
};
