import React, { VFC } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const CurrentDay: VFC = () => {
  const date = new Date().toDateString();

  return <Container>{date}</Container>;
};

export default CurrentDay;
