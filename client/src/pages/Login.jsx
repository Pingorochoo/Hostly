import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../store";
const initialForm = { email: "", password: "" };
const Login = () => {
  const [form, setForm] = useState(initialForm);
  const { setUser } = useUser();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login", {
        email: form.email,
        password: form.password,
      });
      setUser(data);
      // console.log(data);
      alert("login success");
      // setForm(initialForm);
    } catch (error) {
      alert(`register fail error: ${error.message}`);
    }
  };

  return (
    <div className="grow flex flex-col items-center justify-center -mt-[46px]">
      <h1 className="text-4xl text-center">Login</h1>
      <form className="mt-4 max-w-md mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" className="primary">
          Login
        </button>
        <span className="text-center py-2 text-gray-500 block">
          Don&apos;t have an account yet?
          <Link className="underline text-black" to="/register">
            Register now
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
