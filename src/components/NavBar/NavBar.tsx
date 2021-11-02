import { VFC, useCallback } from "react";
import styled from "styled-components";
import { GrLogout } from "react-icons/gr";
import { auth } from "../../firebase";
// import CurrentDay from "../CurrentDay";

const Container = styled.div`
  display: flex;
  padding: 1rem 2rem;
  justify-content: center;
  position: relative;
  background-color: #00000095;
  color: #fff;
`;

const LogoutIcon = styled(GrLogout)`
  :hover {
    cursor: pointer;
  }
  position: absolute;
  right: 1.5rem;
  top: 35%;
`;

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
`;

const NavBar: VFC = () => {
  const handleLogout = useCallback(async () => {
    try {
      await auth.signOut();
      console.log("User signed out");
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <Container>
      {/* <CurrentDay /> */}
      <Title>Todoify</Title>
      <LogoutIcon onClick={handleLogout} />
    </Container>
  );
};

export default NavBar;
