import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { provider, auth, providerFB } from "./firebase";
import { statevalueProvider } from "./StateProvider";
import { stateawal } from "./Reducer";

function Login() {
  const [{ login }, dispatch] = statevalueProvider();
  const handleButtonLogin = async () => {
    try {
      const dataLogin = await auth.signInWithPopup(provider);
      dispatch({
        type: stateawal.STATE_AWAL,
        login: dataLogin.user,
      });
    } catch (error) {
    console.log(error)
    }
  };
  const handleButtonLoginFB = async () => {
    try {
      const dataFb = await auth.signInWithPopup(providerFB);
      dispatch({
        type: stateawal.STATE_AWAL,
        login: dataFb.user,
      });
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="Login">
      <h1 style={{ color: "white" }}>Welcome Twitter Login Screen</h1>
      <img className="logo__twitter" src="./img/love.png" alt="" />
      <Button
        className="button__login"
        onClick={handleButtonLogin}
        variant="contained"
      >
        <img src="./img/goo.png" style={{ width: "40px" }} alt="" />
        <h4>Login With Google</h4>
      </Button>
      <hr />
      <Button
        className="button__loginFb"
        onClick={handleButtonLoginFB}
        variant="contained"
      >
        <img src="./img/logo192.png" style={{ width: "30px" }} alt="" />
        <h4>Login With Facebook</h4>
      </Button>
    </div>
  );
}

export default Login;
