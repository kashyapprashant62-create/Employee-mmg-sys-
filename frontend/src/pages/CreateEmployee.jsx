import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const [employee, setEmployee]= useState({
    firstname:"",
    lastname:"",
    email:"",
    age:"",
    doj:"",
    designation:"",
});
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

const handleChange =(e)=>{
  let {name , value} = e.target;
  setEmployee({...employee,[name]:value});

}
const handleSubmit = async(e)=>{
  e.preventDefault();
  try {
    setLoading(true);
      let resp = await axios.post("http://localhost:5000/employee",employee);
      alert("employee created ✅");
      console.log(resp);
      navigate("/all")
  } catch (error) {
    alert("Unable to create ❌");
    console.log(error);
    
  }
  finally{
    setLoading(false);
  }

}
  return (
    <section className="min-h-screen bg-zinc-100 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 p-8">

        <h1 className="text-4xl font-bold text-center text-zinc-900">
          Create Employee
        </h1>

        <p className="text-center text-zinc-500 mt-2 mb-8">
          Fill in the employee details
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="First Name"
            required
            name="firstname"
            id="firstname"
            value={employee.firstname}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
          />

          <input
            type="text"
            placeholder="Last Name"
            required
            name="lastname"
            id="lastname"
             value={employee.lastname}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            name="email"
            id="email"
             value={employee.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
          />

          <input
            type="number"
            placeholder="Age"
            required
            name="age"
            id="age"
             value={employee.age}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
          />

          <input
            type="text"
            required
            placeholder="SDE "
            name="designation"
            id="designation"
             value={employee.designation}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
          />

          <input
            required
            type="date"
            name="doj"
            id="doj"
            value={employee.doj}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
          />

          <button
  type="submit"
  disabled={loading}
  className={`md:col-span-2 w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center transition-all duration-300 ${
    loading
      ? "bg-zinc-700 cursor-not-allowed"
      : "bg-black hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 cursor-pointer"
  }`}
>
  {loading ? (
    <>
      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Creating Employee...
    </>
  ) : (
    "Create Employee"
  )}
</button>

        </form>

      </div>
    </section>
  );
};

export default CreateEmployee;