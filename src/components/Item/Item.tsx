import React, { useCallback, useState, VFC } from "react";
import styled from "styled-components";
import { Task } from "../../types";
import Checkbox from "../Checkbox";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { EditTaskNameForm } from "../../containers";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  margin: 0.125rem 0;
  @media (min-width: 450px) {
    height: 60px;
  }
`;

const RemoveIcon = styled(RiDeleteBin6Line)`
  margin-left: 1rem;
  :hover {
    cursor: pointer;
  }
  @media (min-width: 450px) {
    margin-left: 2rem;
  }
`;

const EditIcon = styled(GrEdit)`
  :hover {
    cursor: pointer;
  }
  @media (min-width: 450px) {
    margin-left: 2rem;
  }
`;

const Text = styled.div<{ checked: boolean }>`
  font-size: 1rem;
  text-decoration: ${({ checked }) => checked && "line-through"};
  flex: 1;
  margin: 0;
  padding-top: 4px;
  @media (min-width: 450px) {
    padding: 0 0 0.25rem;
    font-size: 1.25rem;
  }
`;

type ItemProps = {
  handleRemoveItem: (id: string) => void;
  handleComplete: (checked: boolean, id: string) => void;
} & Omit<Task, "createdAt">;

const Item: VFC<ItemProps> = ({
  taskName,
  id,
  completed,
  handleRemoveItem,
  handleComplete,
}) => {
  const [editTaskName, setEditTaskName] = useState(false);

  const handleClick = useCallback(
    () => handleRemoveItem(id),
    [id, handleRemoveItem]
  );

  const onChange = useCallback(
    (checked) => handleComplete(checked, id),
    [handleComplete, id]
  );

  const handleEditTaskName = useCallback(
    () => setEditTaskName(!editTaskName),
    [editTaskName]
  );

  return (
    <Container>
      <Checkbox onChange={onChange} checked={completed} />
      {editTaskName ? (
        <EditTaskNameForm
          id={id}
          taskName={taskName}
          onCloseForm={handleEditTaskName}
        />
      ) : (
        <Text checked={completed}>{taskName}</Text>
      )}
      {!editTaskName && <EditIcon onClick={handleEditTaskName} />}
      <RemoveIcon onClick={handleClick}>X</RemoveIcon>
    </Container>
  );
};

export default Item;
