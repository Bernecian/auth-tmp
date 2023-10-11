import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as Styles from "./styles";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { state, login } = useContext(AuthContext);
  const { isAuth, authError, authLoading } = state;
  const [userData, setUserData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    login(userData);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, username: e.target.value }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, password: e.target.value }));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <Styles.Container>
      <Styles.Heading>Login</Styles.Heading>
      <Styles.Input onChange={handleUsernameChange} />
      <Styles.Input type="password" onChange={handlePasswordChange} />
      <Styles.Button disabled={authLoading} onClick={handleLogin}>
        Login
      </Styles.Button>
      {authLoading ? <Styles.Loader>Loading...</Styles.Loader> : null}
      <Styles.ErrorMessage>{authError}</Styles.ErrorMessage>
    </Styles.Container>
  );
};

export default LoginPage;
