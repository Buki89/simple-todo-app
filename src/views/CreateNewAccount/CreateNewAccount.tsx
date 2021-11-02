import { useCallback, VFC } from "react";
import styled from "styled-components";
import { Card } from "../../components";
import { CreateNewAccountForm } from "../../containers";
import { FaChevronLeft } from "react-icons/fa";
import { useHistory } from "react-router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #fff;
  border-radius: 1rem;
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

const BackIcon = styled(FaChevronLeft)`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

const CreateNewAccount: VFC = () => {
  const history = useHistory();

  const handleGoBack = useCallback(() => history.goBack(), [history]);

  return (
    <Card>
      <Container>
        <BackIcon color="#00000095" onClick={handleGoBack} />
        <Title>Todoify</Title>
        <SubTitle>Create new account</SubTitle>
        <CreateNewAccountForm />
      </Container>
    </Card>
  );
};

export default CreateNewAccount;
