import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  border: 0;
  @media (min-width: 450px) {
    border-radius: 0.75rem;
    border: 2px solid black;
    max-width: 450px;
    margin: 2rem auto;
  }
`;

const Card: FC = ({ children }) => <Container>{children}</Container>;

export default Card;
