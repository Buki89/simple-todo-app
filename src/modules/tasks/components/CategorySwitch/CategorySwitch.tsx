import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #b08010;
  color: #fff;
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const Choice = styled.p`
  font-size: 1rem;
  font-weight: 500;
  user-select: none;
  margin: 0.5rem 0;
  :hover {
    cursor: pointer;
    color: #00000070;
  }
`;

type SwitchProps = {};

const Switch: FC<SwitchProps> = () => {
  return (
    <Container>
      <Choice>Task manager</Choice>
      <Choice>Shopping list</Choice>
    </Container>
  );
};

export default Switch;
