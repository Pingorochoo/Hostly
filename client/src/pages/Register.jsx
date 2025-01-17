import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const initialForm = { name: "", email: "", password: "" };
const Register = () => {
  const [form, setForm] = useState(initialForm);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      alert("register success");
    } catch (error) {
      alert(`register fail error: ${error.message}`);
    }

    // setForm(initialForm);
  };
  return (
    <div className="grow flex flex-col items-center justify-center -mt-[46px]">
      <h1 className="text-4xl text-center">Register</h1>
      <form className="mt-4 max-w-md mx-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
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
