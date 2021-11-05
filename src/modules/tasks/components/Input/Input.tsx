import { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";

const StyledInput = styled.input`
  height: 100%;
  padding: 0.25rem;
  font-size: 1rem;
`;

type InputProps = FieldRenderProps<string, HTMLInputElement>;

const Input: FC<InputProps> = ({ input, meta, placeholder, label }) => {
  return (
    <StyledInput
      {...input}
      id={label}
      name={input.name}
      value={input.value}
      onChange={input.onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
