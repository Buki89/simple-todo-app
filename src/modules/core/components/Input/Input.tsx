import { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";
import { getColor } from "../../../../utils";

const Container = styled.div<{ error: string | undefined }>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1rem;
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
  }
  input:-webkit-autofill ~ label {
    top: 0;
    left: 0;
    color: ${({ error }) => (error ? "#f00" : "#03a9f4")};
    font-size: 12px;
  }
`;

const Error = styled.p`
  position: absolute;
  font-size: 0.75rem;
  color: red;
  right: 0;
  bottom: -14px;
`;

type FocusedBorderProps = {
  valid?: boolean;
  error: string | undefined;
};

const FocusedBorder = styled.span<FocusedBorderProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: ${({ valid }) => (valid ? "100%" : 0)};
  background: ${({ error }) => (error ? "#f00" : "#03a9f4")};
  transition: 0.4s;
  transition-timing-function: ease-in-out;
`;

type LabelProps = {
  label?: string;
  error: string | undefined;
  empty: boolean;
};

const Label = styled.label<LabelProps>`
  position: absolute;
  top: ${({ empty }) => (!empty ? 0 : "40%")};
  left: ${({ empty }) => (!empty ? 0 : "5%")};
  font-size: ${({ empty }) => (!empty ? "12px" : "18px")};
  transition: 0.4s;
  color: ${({ error, empty }) => getColor(error, empty)};
`;

type StyledInputProps = {
  error: string | undefined;
  empty: boolean;
};

const StyledInput = styled.input<StyledInputProps>`
  position: relative;
  margin: 0;
  padding: 12px;
  outline: none;
  border: none;
  border-bottom: ${({ error }) =>
    error ? "2px solid red" : "2px solid #00000050"};
  color: ${({ error, empty }) => getColor(error, empty)};
  font-size: 18px;
  padding-top: 15px;
  padding-bottom: 5px;
  background-color: #fff !important;
  :focus ~ label {
    top: 0;
    left: 0;
    color: ${({ error }) => (error ? "#f00" : "#03a9f4")};
    font-size: 12px;
  }
  :focus ~ span {
    width: 100%;
  }
`;

type InputProps = FieldRenderProps<string, HTMLInputElement>;

const Input: FC<InputProps> = ({ input, meta, placeholder, label }) => {
  const err: string | undefined =
    meta.touched && meta.error ? meta.error : undefined;

  const empty = input && input.value.length === 0;

  return (
    <Container error={err}>
      <StyledInput
        {...input}
        id={label}
        empty={empty}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        placeholder={placeholder}
        error={err}
      />
      <Label htmlFor={label} label={label} error={err} empty={empty}>
        {label}
      </Label>
      <FocusedBorder valid={meta.valid} error={err} />
      <Error>{err}</Error>
    </Container>
  );
};

export default Input;
