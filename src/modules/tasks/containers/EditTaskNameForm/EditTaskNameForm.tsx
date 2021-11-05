import React, { FC, useCallback } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import { FcCheckmark } from "react-icons/fc";
import { useTaskContext } from "../../../../context";
import { Task, ActionType } from "../../../../types";
import { exist } from "../../../../validators";
import { Input } from "../../../core";

const Container = styled.div`
  flex: 1;
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CancelIcon = styled(ImCancelCircle)`
  :hover {
    cursor: pointer;
  }
`;

const ApplyIcon = styled(FcCheckmark)`
  :hover {
    cursor: pointer;
  }
`;

type EditTaskNameFormProps = {
  taskName: string;
  id: string;
  onCloseForm: () => void;
};

const EditTaskNameForm: FC<EditTaskNameFormProps> = ({
  id,
  taskName,
  onCloseForm,
}) => {
  const { state, dispatch } = useTaskContext();

  const onSubmit = useCallback(
    (value: Pick<Task, "taskName">): void => {
      const { taskName } = value;
      dispatch({
        type: ActionType.editTask,
        payload: { taskName, id },
      });
      onCloseForm();
    },
    [dispatch, onCloseForm, id]
  );

  const handleCloseForm = useCallback(() => onCloseForm(), [onCloseForm]);

  return (
    <Container>
      <Form
        onSubmit={onSubmit}
        validate={(values) => exist(values, state)}
        render={({ handleSubmit }) => {
          return (
            <StyledForm>
              <Field name="taskName" initialValue={taskName}>
                {(props) => <Input type="text" {...props} />}
              </Field>
              <CancelIcon onClick={handleCloseForm} />
              <ApplyIcon onClick={handleSubmit} />
            </StyledForm>
          );
        }}
      />
    </Container>
  );
};

export default EditTaskNameForm;
