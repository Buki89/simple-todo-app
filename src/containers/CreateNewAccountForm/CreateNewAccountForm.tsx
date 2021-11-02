import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useCallback, useState, VFC } from "react";
import { Field, Form } from "react-final-form";
import { useHistory } from "react-router";
import { Input, LoginButton } from "../../components";
import { Credentials } from "../../types";
import {
  composeValidators,
  email,
  minLength,
  required,
} from "../../validators";

const CreateNewAccountForm: VFC = () => {
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const history = useHistory();

  const handleCreateAccount = useCallback(
    async (credentials: Credentials) => {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }

      history.push("/");
    },
    [auth, history]
  );

  return (
    <Form
      onSubmit={handleCreateAccount}
      validate={(values) => {
        const error: Record<string, string> = {};
        if (values.password !== values.confirmPassword) {
          error.confirmPassword = "Passwords do not match";
        }
        return error;
      }}
      render={({ handleSubmit, valid }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field name="email" validate={composeValidators(required, email)}>
              {(props) => <Input type="email" label="Email" {...props} />}
            </Field>
            <Field
              name="password"
              type="password"
              validate={composeValidators(required, minLength)}
            >
              {(props) => <Input label="Password" {...props} />}
            </Field>
            <Field
              type="password"
              name="confirmPassword"
              validate={composeValidators(required)}
            >
              {(props) => <Input label="Confirm Password" {...props} />}
            </Field>
            <LoginButton type="submit" loading={loading} disabled={!valid}>
              Create Account
            </LoginButton>
          </form>
        );
      }}
    />
  );
};

export default CreateNewAccountForm;
