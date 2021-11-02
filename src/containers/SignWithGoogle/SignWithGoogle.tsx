import { FC, useCallback } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import GoogleIcon from "./GoogleIcon";
import { auth } from "../../firebase";
import { useHistory } from "react-router";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 1rem;
  align-self: center;
  margin-left: 0.5rem;
  color: #00000095;
`;

type SignWithGoogleProps = {};

const SignWithGoogle: FC<SignWithGoogleProps> = () => {
  const history = useHistory();

  const handleClick = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    try {
      const result = await signInWithPopup(auth, provider);
      result && history.push("/dashboard");
    } catch (error) {
      console.log("error", error);
    }
  }, [history]);

  return (
    <Container onClick={handleClick}>
      <GoogleIcon />
      <Text>Sign in with Google</Text>
    </Container>
  );
};

export default SignWithGoogle;
