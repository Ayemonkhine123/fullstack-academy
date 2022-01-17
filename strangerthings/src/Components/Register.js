import { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";
const Register = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { token } = await register(username, password);
    setToken(token);
    localStorage.setItem("TOKEN", token);
    setUsername("");
    setPassword("");
    navigate("/posts");
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2> Sign Up </h2>
      <div className="form-field">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          value={username}
          className="form-input"
          id="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          minLength="6"
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="form-input"
          value={password}
          id="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          minLength="6"
        />
      </div>
      <div>
        <button type="submit" className="form-submit-btn">
          Register
        </button>
      </div>
      <a className="form-link" href={"/login"}>
        Already have an account? Log in
      </a>
    </form>
  );
};
export default Register;
