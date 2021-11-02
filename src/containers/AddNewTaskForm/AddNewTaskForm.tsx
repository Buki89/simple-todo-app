import { Button, Input } from "../../components";
import { Form, Field } from "react-final-form";
import { exist } from "../../validators";
import { VFC } from "react";
import styled from "styled-components";
import { Task, ActionType } from "../../types";
import { useTaskContext } from "../../context";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

type AddNewTaskFormProps = {};

const AddNewTaskForm: VFC<AddNewTaskFormProps> = () => {
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
            <Button type="submit" disabled={submitting || pristine || !valid}>
              Add task
            </Button>
          </StyledForm>
        );
      }}
    />
  );
};

export default AddNewTaskForm;
