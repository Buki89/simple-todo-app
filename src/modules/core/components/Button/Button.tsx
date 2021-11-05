import { FC } from "react";
import styled from "styled-components";
import SpinnerBase from "../Spinner";

const StyledButton = styled.button<{ disabled?: boolean }>`
  height: 100%;
  background-color: ${({ disabled }) => disabled && "#00000095"};
  position: relative;
`;

const Spinner = styled(SpinnerBase)`
  position: absolute;
  top: 8px;
  right: 15px;
  color: #fff;
`;

export type ButtonProps = {
  children: string | JSX.Element;
  type?: "submit" | "button";
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({
  children,
  type,
  disabled,
  className,
  loading,
  onClick,
}) => {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
      {loading && <Spinner />}
    </StyledButton>
  );
};

export default Button;
