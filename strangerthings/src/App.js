import "./App.css";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { Posts, Login, Register, Profile, Post, PostForm } from "./Components";
import { useState, useEffect } from "react";
import { getUser } from "./api";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const handleUser = async () => {
    if (token) {
      const userObject = await getUser(token);
      setUser(userObject);
    } else {
      const localStoreToken = localStorage.getItem("TOKEN");
      if (!localStorage) {
        navigate("/login");
      } else {
        setToken(localStoreToken);
      }
    }
  };

  useEffect(() => {
    handleUser();
  }, [token]);

  return (
    <div className="App">
      <nav className="Nav">
        {Object.keys(user).length > 0 && <h2>Welcome, {user.username}</h2>}
        <Link className="nav-item" to="/posts">
          Posts
        </Link>
        <Link className="nav-item" to="/profile">
          Profile
        </Link>
        <Link className="nav-item" to="/login">
          Login
        </Link>
        <Link className="nav-item" to="/register">
          Register
        </Link>
      </nav>
      <div className="Page">
        <Routes>
          <Route path="/posts" element={<Posts userInfo={user} />} />
          <Route path="/posts/create" element={<PostForm token={token} />} />
          <Route
            path="/posts/:postId"
            element={<Post userInfo={user} token={token} />}
          />

          <Route
            path="/login"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route
            path="/register"
            element={<Register token={token} setToken={setToken} />}
          />
          <Route path="/profile" element={<Profile userInfo={user} />}></Route>
          <Route exact path="/" element={<Navigate replace to="/posts" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
