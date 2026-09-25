import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [registeredUser, setRegisteredUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    async function getRegisteredUser() {
      try {
        setLoading(true);
        const resp = await axios.get("http://localhost:5000/users");
        setRegisteredUser(resp.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    getRegisteredUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const authUser = registeredUser.find(
      (user) =>
        user.email === formData.email && user.password === formData.password,
    );

    if (authUser) {
      const token = Math.random();

      localStorage.setItem("token", token);
      setTimeout(() => {
        setBtnLoading(false);
        navigate("/");
      }, 1000);
    } else {
      setBtnLoading(false);
      alert("Invalid Credentials ❌");
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="min-h-screen bg-zinc-100 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-zinc-200 p-8">
        <h1 className="text-4xl font-bold text-center text-zinc-900">
          Welcome Back
        </h1>

        <p className="text-center text-zinc-500 mt-2 mb-8">Login to continue</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-black text-white py-3 font-semibold transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 cursor-pointer"
            disabled={btnLoading}
          >
            {btnLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-zinc-500 mt-6">
          Don't have an account?
          <Link
            to="/signup"
            onClick={() => setLoading(true)}
            className="ml-2 font-semibold text-black hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
