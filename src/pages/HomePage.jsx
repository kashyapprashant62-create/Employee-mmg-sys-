import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-zinc-100 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-zinc-200 p-8">

        <h1 className="text-4xl font-bold text-center text-zinc-900">
          Employee Management
        </h1>

        <p className="text-center text-zinc-500 mt-2 mb-10">
          Select an option to continue
        </p>

        <div className="flex flex-col gap-5">

          <button
            onClick={() => navigate("/create")}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Create Employee
          </button>

          <button
            onClick={() => navigate("/all")}
            className="w-full bg-zinc-200 text-black py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-zinc-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            All Employees
          </button>

        </div>

      </div>
    </section>
  );
};

export default HomePage;