import { VFC } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: center;
  align-items: center;
  color: #00000095;
`;

const Line = styled.div`
  margin: 0 0.5rem;
  height: 1px;
  width: 50px;
  background-color: #00000095;
`;

const Divider: VFC = () => (
  <Container>
    <Line />
    or
    <Line />
  </Container>
);

export default Divider;
