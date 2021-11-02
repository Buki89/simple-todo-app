import { FC } from "react";
import styled from "styled-components";
import { Task } from "../../types";
import Item from "../Item";
import SpinnerBase from "../../components/Spinner";

const Container = styled.div`
  margin: 0 1rem;
  overflow: auto;
  @media (min-width: 450px) {
    margin: 2rem;
  }
`;

const SpinnerContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled(SpinnerBase)`
  stroke: #000;
  height: 50px;
  width: 50px;
`;

const Divider = styled.div`
  border: 1px solid #00000080;
  margin: 0.25rem;
`;

type ItemListProps = {
  tasks: Task[];
  loading: boolean;
  handleRemoveItem: (id: string) => void;
  handleComplete: (checked: boolean, id: string) => void;
};

const ItemList: FC<ItemListProps> = ({
  tasks,
  loading,
  handleRemoveItem,
  handleComplete,
}) => {
  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <Container>
      <p>Today</p>
      <Divider />
      {tasks &&
        tasks.map((task: Task) => (
          <Item
            id={task.id}
            key={task.id}
            taskName={task.taskName}
            completed={task.completed}
            handleRemoveItem={handleRemoveItem}
            handleComplete={handleComplete}
          />
        ))}
    </Container>
  );
};

export default ItemList;
