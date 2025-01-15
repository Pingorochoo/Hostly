import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="grow flex flex-col items-center justify-center -mt-[46px]">
      <h1 className="text-4xl text-center">Register</h1>
      <form className="mt-4 max-w-md mx-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="primary">Register</button>
        <div className="text-center py-2 text-gray-500">
          Already a member?{" "}
          <Link className="underline text-black" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
