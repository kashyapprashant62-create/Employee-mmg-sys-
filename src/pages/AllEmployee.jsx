import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
const LIMIT = 5;
const AllEmployee = () => {
  const [allEmp, setAllEmp] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(allEmp);


 useEffect(() => {
  async function getEmployee() {
    try {
      setLoading(true);

      const resp = await axios.get(
        `http://localhost:5000/employee?_per_page=${LIMIT}&_page=${page}`
      );

      console.log(resp.data.data);

      setAllEmp(resp.data.data);
      setPagination(resp.data);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  getEmployee();
}, [page]);


  const handleDelete= async(id)=>{
    try {
      await axios.delete(`http://localhost:5000/employee/${id}`);
      alert("Employee Deleted ✅")
      
    } catch (err) {
      console.log(err);
      alert("unble to delete ❌")
      
      
    }
  }
  if (loading) {
  return <Loader />;
}
  return (
    <article className="h-screen w-full bg-zinc-100 px-20">
      <h1 className="py-5 font-bold text-xl">All Employees</h1>
      <table className="shadow-lg rounded mx-auto mt-10">
        <thead>
          <tr>
            <td className="p-2">ID</td>
            <td className="p-2">FIRST NAME</td>
            <td className="p-2">LAST NAME</td>
            <td className="p-2">EMAIL</td>
            <td className="p-2">AGE</td>
            <td className="p-2">DESIGNATION</td>
            <td className="p-2">DOJ</td>
            <td className="p-2">ACTIONS</td>
          </tr>
        </thead>
        <tbody className="bg-zinc-50">
          {allEmp?.length === 0 ? (
            <tr>
              <td colSpan={8}>No Employee Available</td>
            </tr>
          ) : (
            allEmp?.map((emp) => {
              let { id, firstname, lastname, age, doj, designation, email } =
                emp;
              return (
                <tr key={id} className="hover:bg-zinc-200 cursor-pointer">
                  <td className="py-2 px-2">{id}</td>
                  <td className="py-2 px-2">{firstname}</td>
                  <td className="py-2 px-2">{lastname}</td>
                  <td className="py-2 px-2">{email}</td>
                  <td className="py-2 px-2">{age}</td>
                  <td className="py-2 px-2">{designation}</td>
                  <td className="py-2 px-2">{doj}</td>
                  <td className="py-2 px-2">
                    <Link
                      to={`/edit/${id}`}
                      className="shadow mx-4 border border-zinc-700 px-5 py-1 rounded cursor-pointer"
                    >
                      Edit
                    </Link>
                    <button onClick={()=>{handleDelete(id)}}  className="shadow mx-4 border border-zinc-700 px-5 py-1 rounded cursor-pointer"  >Delete</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className="flex justify-around mt-10">
        <button
  className="border px-4 py-2 rounded"
  onClick={() => setPage((prev) => prev - 1)}
  disabled={page === 1}
>
  Prev
</button>

        <p>
          {page} of {pagination.pages}
        </p>

        <button
          className="border px-2"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!pagination.next}
        >
          Next
        </button>
        
      </div>
    </article>
  );
};

export default AllEmployee;
