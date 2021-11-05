import { VFC } from "react";
import styled from "styled-components";
import { Button } from "../../../core";
import { ButtonProps } from "../../../core/components/Button";

const StyledButton = styled(Button)`
  background-color: #0066ff;
  color: #fff;
  border: 0;
  padding: 0.5rem;
`;

const AddTaskButton: VFC<ButtonProps> = (props) => {
  return <StyledButton {...props}>ADD</StyledButton>;
};

export default AddTaskButton;
