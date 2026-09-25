import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";

const EditEmployee = () => {

  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    designation: "",
    doj: "",
  });

  const navigate = useNavigate();
  const params = useParams() 
  console.log(params);       // {id: '9FPYIu1EqW0'}
  

  const handleChange = (e) => {
    let { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };


  useEffect(()=>{
    async function getEditEmployee() {
        try {
          let resp = await axios.get(`http://localhost:5000/employee/${params.id}`)
          console.log(resp);
          setEmployee(resp.data)
        } catch (error) {
          console.log(error);
          alert("Something went wrong")
        }
    }
    getEditEmployee()
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/employee/${params.id}`, employee)
      navigate("/all")
      alert("Employee Updated ✅")
    } catch (error) {
      console.log(error);
      alert("Unable to update")
    }
  };

  return (
  <section className="min-h-screen bg-zinc-100 flex items-center justify-center px-5 py-10">
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 p-8">

      <h1 className="text-4xl font-bold text-center text-zinc-900">
        Edit Employee
      </h1>

      <p className="text-center text-zinc-500 mt-2 mb-8">
        Update employee details
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* First Name */}
        <input
          required
          type="text"
          name="firstname"
          placeholder="First Name"
          value={employee.firstname}
          onChange={handleChange}
          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
        />

        {/* Last Name */}
        <input
          required
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={employee.lastname}
          onChange={handleChange}
          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
        />

        {/* Email */}
        <input
          required
          type="email"
          name="email"
          placeholder="Email Address"
          value={employee.email}
          onChange={handleChange}
          className="md:col-span-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
        />

        {/* Designation */}
        <input
          required
          type="text"
          name="designation"
          placeholder="Designation"
          value={employee.designation}
          onChange={handleChange}
          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
        />

        {/* Age */}
        <input
          required
          type="number"
          name="age"
          placeholder="Age"
          value={employee.age}
          onChange={handleChange}
          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
        />

        {/* Date of Joining */}
        <input
          required
          type="date"
          name="doj"
          value={employee.doj}
          onChange={handleChange}
          className="md:col-span-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-zinc-300 transition"
        />

        {/* Button */}
        <button
          type="submit"
          className="md:col-span-2 w-full bg-black text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          Update Employee
        </button>
      </form>
    </div>
  </section>
);
};

export default EditEmployee;