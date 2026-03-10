import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const login = () => {
    apiClient
      .post("/login", user)
      .then(() => {
        toast.success("sikeres");
        localStorage.setItem("credentials", JSON.stringify(user));
        navigate("/");
      })
      .catch(() => toast.error("sikertelen"));
  };
  return (
    <>
      <h1>felhasznalonev: </h1>
      <input
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <h1>jelszo: </h1>
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button onClick={login}>bejelentkezes</Button>
    </>
  );
};
export default LoginPage;
