import { State, Task, TaskValidation } from "./types";

type Validator = (value: string) => string | undefined;

export const composeValidators =
  (...validators: any) =>
  (value: string) =>
    validators.reduce(
      (error: any, validator: any) => error || validator(value),
      undefined
    );

export const required: Validator = (value) => (value ? undefined : "Required");

export const empty: Validator = (value: string) =>
  value.length > 0 ? undefined : "Empty";

export const minLength: Validator = (value: string) =>
  value.length > 5 ? undefined : "Password is too short";

export const email: Validator = (value: string) => {
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g.test(value);
  return validEmail ? undefined : "Invalid email adress";
};

export const exist = (value: Omit<Task, "id" | "completed">, tasks?: State) => {
  const errors: TaskValidation = {};
  if (
    tasks &&
    tasks.filter((task: Task) => task.taskName === value.taskName).length > 0
  ) {
    errors.taskName = "Task already exist";
  }
  return errors;
};
