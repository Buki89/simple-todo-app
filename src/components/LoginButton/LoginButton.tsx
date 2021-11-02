import { FC } from "react";
import styled from "styled-components";
import { Button as ButtonBase } from "../../components";
import { ButtonProps } from "../Button";

const Button = styled(ButtonBase)<{ disabled?: boolean }>`
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? "#00000095" : "#0072b5")};
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  border: 0;
  margin: 1rem 2rem 0;
  border-radius: 1rem;
  height: 68%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginButton: FC<ButtonProps> = (props) => {
  return (
    <ButtonContainer>
      <Button {...props} />
    </ButtonContainer>
  );
};

export default LoginButton;
