import { FirebaseError as FbError } from "@firebase/util";

export interface Task {
  id: string;
  taskName: string;
  completed: boolean;
  createdAt?: string;
}

export interface Credentials {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface FirebaseError {
  code: string;
  message: string;
  name: FbError;
  stack?: string;
}

export type State = Task[];

export interface TaskValidation {
  taskName?: string;
}

export enum ActionType {
  addTask = "ADD_TASK",
  removeTask = "REMOVE_TASK",
  editTask = "EDIT_TASK",
  fetchTasks = "FETCH_TASKS",
}

export type Action =
  | {
      type: ActionType.addTask;
      payload: string;
    }
  | {
      type: ActionType.removeTask;
      payload: string;
    }
  | {
      type: ActionType.editTask;
      payload: Partial<Task>;
    }
  | {
      type: ActionType.fetchTasks;
      payload: State;
    };

export type ContextProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
