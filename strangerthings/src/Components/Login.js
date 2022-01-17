import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await login(username, password);
    localStorage.setItem("TOKEN", token);
    setToken(token);
    setUsername("");
    setPassword("");
    navigate("/posts");
  };

  return (
    <form className="Login-form" onSubmit={handleSubmit}>
      <h2> Login </h2>
      <div className="form-field">
        <label className="form-label"> Username </label>
        <input
          value={username}
          className="form-input"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div className="form-field">
        <label className="form-label"> Password </label>
        <input
          type="password"
          className="form-input"
          value={password}
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <div>
        <button className="form-submit-btn" type="submit">
          Login
        </button>
      </div>
      <a className="form-link" style={{ width: "100%" }} href={"/register"}>
        Don't have an account? Sign up
      </a>
    </form>
  );
};
export default Login;
