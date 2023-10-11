import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import * as Styles from "./styles";

const HomePage = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Styles.Container>
      <Styles.Heading>Hey there from protected route</Styles.Heading>
      <Styles.Button onClick={logout}>Logout</Styles.Button>
    </Styles.Container>
  );
};

export default HomePage;
