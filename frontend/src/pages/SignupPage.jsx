import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/users", formData);

      console.log(res.data);

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      alert("Signup Successful ✅");

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Signup Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-zinc-100 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-zinc-200">
        <h1 className="text-4xl font-bold text-center text-zinc-900">
          Create Account
        </h1>

        <p className="text-center text-zinc-500 mt-2 mb-8">
          Welcome! Please fill in your details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 text-white font-semibold flex items-center justify-center transition-all duration-300 ${
              loading
                ? "bg-zinc-700 cursor-not-allowed"
                : "bg-black hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-zinc-500 mt-6">
          Already have an account?
          <span className="ml-2 cursor-pointer font-semibold text-black hover:underline">
            <Link
              to="/login"
              className="ml-2 font-semibold text-black hover:underline"
            >
              Login
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default SignupPage;
