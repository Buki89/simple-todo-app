import { VFC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../../components";
import { SignInWithEmail, SignWithGoogle } from "../../containers";
import Divider from "./Divider";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #00000095;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  justify-content: center;
  display: flex;
  margin-top: 2rem;
`;

const Welcome = styled.p`
  text-align: center;
  margin: 2rem 0;
  font-size: 1.25rem;
  color: #36394595;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  color: #0f0f0fc2;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #fff;
  border-radius: 1rem;
`;

const UnderlinedText = styled.p`
  text-decoration: underline;
  margin-left: 0.5rem;
`;

const Login: VFC = () => {
  return (
    <Card>
      <Container>
        <Title>Todoify</Title>
        <div>
          <Welcome>Welcome to Todoify</Welcome>
          <SignInWithEmail />
          <Divider />
          <SignWithGoogle />
          <StyledLink to="create-new-account">
            New to todoify?
            <UnderlinedText>Create account </UnderlinedText>
          </StyledLink>
        </div>
      </Container>
    </Card>
  );
};

export default Login;
