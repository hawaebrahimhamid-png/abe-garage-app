import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e) => {
   e.preventDefault();

   try {
     const res = await api.post("/login", {
       email,
       password,
     });

     console.log("LOGIN RESPONSE:", res.data);

     if (res.data.success) {
       localStorage.setItem("token", res.data.token);
       navigate("/admin");
     } else {
       alert("Login failed");
     }
   } catch (error) {
     console.error(error);
     alert("Backend not reachable");
   }
 };

  return (
    <div className="flex flex-col gap-4 p-6">
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <button
        onClick={() => navigate("/register")}
        className="text-blue-600 underline"
      >
        Create account
      </button>
    </div>
  );
}

export default Login;
