import { VFC, useCallback, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Credentials } from "../../../../types";
import {
  composeValidators,
  required,
  email,
  minLength,
} from "../../../../validators";
import { Input } from "../../../core";
import { LoginButton } from "../../components";

const ErrorMessage = styled.div`
  color: red;
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  text-align: right;
`;

const ForgotPassword = styled(Link)`
  font-size: 0.75rem;
  color: #36486b;
  align-self: flex-end;
  text-decoration: none;
  :hover {
    cursor: pointer;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignInWithEmail: VFC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const auth = getAuth();

  const history = useHistory();

  const onSubmit = useCallback(
    async (credentials: Credentials) => {
      try {
        setLoading(true);
        const res = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        res.user.uid && history.push("/dashboard");
        console.log(`User sign in with id: ${res.user.uid}`);
        setLoading(false);
      } catch (error: unknown) {
        const { message } = error as FirebaseError;
        setLoading(false);
        setError(message);
      }
    },
    [auth, history]
  );

  useEffect(() => {
    return () => {
      setError("");
    };
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, valid }) => {
        return (
          <StyledForm onSubmit={handleSubmit}>
            <Field name="email" validate={composeValidators(required, email)}>
              {(props) => <Input type="email" label="Email" {...props} />}
            </Field>
            <Field
              name="password"
              validate={composeValidators(required, minLength)}
              type="password"
            >
              {(props) => <Input type="password" label="Password" {...props} />}
            </Field>
            <ErrorMessage>{error}</ErrorMessage>
            <ForgotPassword to="/reset-password">
              Forgot password?
            </ForgotPassword>
            <LoginButton type="submit" loading={loading} disabled={!valid}>
              Sign in
            </LoginButton>
          </StyledForm>
        );
      }}
    />
  );
};

export default SignInWithEmail;
