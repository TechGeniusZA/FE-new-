import React, { useState } from "react";
import { useAuth } from "../../Providers/Auth";

function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async () => {
    const res = await fetch("sample.json");

    const data = await res.json();
    if (email === data.email && password === data.password) {
      auth.setToken(data.token);
      auth.login(data);
    }
  };
  return (
    <div>
      <input
        placeholder="email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <input
        placeholder="password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button
        onClick={() => {
          doLogin();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
