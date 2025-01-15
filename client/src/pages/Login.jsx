import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rediret, setRediret] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
  }
  if (rediret) {
    return <Navigate to="/" />;
  }
  return (
    <div className="grow flex flex-col items-center justify-center -mt-[46px]">
      <h1 className="text-4xl text-center">Login</h1>
      <form className="mt-4 max-w-md mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don&apos;t have an account yet?{" "}
          <Link className="underline text-black" to="/register">
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
