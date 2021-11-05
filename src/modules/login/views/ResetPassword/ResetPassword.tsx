import { FC, useCallback, useState } from "react";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../../../firebase";
import { Credentials } from "../../../../types";
import { composeValidators, required, email } from "../../../../validators";
import { Card, Input } from "../../../core";
import { LoginButton } from "../../components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #fff;
  border-radius: 1rem;
`;

const BackIcon = styled(FaChevronLeft)`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  color: #0f0f0fc2;
`;

const SubTitle = styled.p`
  text-align: center;
  margin: 2rem 0;
  font-size: 1.25rem;
  color: #36394595;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  text-align: right;
`;

type ResetPasswordProps = {};

const ResetPassword: FC<ResetPasswordProps> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const history = useHistory();

  const handleResetPassword = useCallback(
    async (value: Pick<Credentials, "email">) => {
      setLoading(true);
      try {
        await sendPasswordResetEmail(auth, value.email);
        setLoading(false);
        history.push("/");
      } catch (error: unknown) {
        const { message } = error as FirebaseError;
        console.log("error", error);
        setError(message);
        setLoading(false);
      }
    },
    [history]
  );

  const handleGoBack = useCallback(() => history.goBack(), [history]);

  return (
    <Card>
      <Container>
        <BackIcon color="#00000095" onClick={handleGoBack} />
        <Title>Todoify</Title>
        <SubTitle>Reset password</SubTitle>
        <Form
          onSubmit={handleResetPassword}
          render={({ handleSubmit, valid }) => {
            return (
              <StyledForm onSubmit={handleSubmit}>
                <Field
                  name="email"
                  validate={composeValidators(required, email)}
                >
                  {(props) => <Input type="email" label="Email" {...props} />}
                </Field>
                <ErrorMessage>{error}</ErrorMessage>
                <LoginButton type="submit" loading={loading} disabled={!valid}>
                  Reset password
                </LoginButton>
              </StyledForm>
            );
          }}
        />
      </Container>
    </Card>
  );
};

export default ResetPassword;
