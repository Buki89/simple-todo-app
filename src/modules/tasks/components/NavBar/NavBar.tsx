import { VFC, useCallback } from "react";
import styled from "styled-components";
import { HiOutlineLogout } from "react-icons/hi";
import { auth } from "../../../../firebase";
// import CurrentDay from "../CurrentDay";

const Container = styled.div`
  display: flex;
  padding: 1rem 2rem;
  justify-content: center;
  position: relative;
  background-color: #fff;
  color: #000;
  position: relative;
`;

const LogoutIcon = styled(HiOutlineLogout)`
  :hover {
    cursor: pointer;
  }
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  height: 1.25rem;
  width: 1.25rem;
  color: #00000095;
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
