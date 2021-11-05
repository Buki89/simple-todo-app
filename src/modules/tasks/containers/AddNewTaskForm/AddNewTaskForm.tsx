import { Form, Field } from "react-final-form";
import { VFC } from "react";
import styled from "styled-components";
import { exist } from "../../../../validators";
import { ActionType, Task } from "../../../../types";
import { useTaskContext } from "../../../../context";
import { AddTaskButton, Input } from "../../components";

const StyledForm = styled.form`
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddNewTaskForm: VFC = () => {
  const { dispatch, state } = useTaskContext();

  const onSubmit = (value: Pick<Task, "taskName">) => {
    dispatch({ type: ActionType.addTask, payload: value.taskName });
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => exist(values, state)}
      render={({ handleSubmit, form, pristine, submitting, valid }) => {
        return (
          <StyledForm
            onSubmit={(event) => {
              handleSubmit(event);
              form.reset();
            }}
          >
            <Field name="taskName">
              {(props) => (
                <Input type="text" placeholder="Task name" {...props} />
              )}
            </Field>
            <AddTaskButton
              type="submit"
              disabled={submitting || pristine || !valid}
            >
              Add task
            </AddTaskButton>
          </StyledForm>
        );
      }}
    />
  );
};

export default AddNewTaskForm;
