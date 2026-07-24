import {Link , useNavigate} from 'react-router-dom'

const NavBar = () => {
  const token = localStorage.getItem("token");
 const navigate = useNavigate();

 const handleLogout =()=>{
  const comfirmMsg = confirm("Are you sure?")
  if(comfirmMsg){
    localStorage.removeItem("token");
    navigate("/login")
  }
 }
  return (
    <header className="bg-zinc-800 text-zinc-100 flex items-center justify-between px-20 py-5"> 
        <Link to={"/"} className='text-2xl font-extrabold'  >CRUD APP </Link>
        <nav className='flex gap-5 font-sembold'>
      {token ? <> 
      <button onClick={handleLogout}>Logout</button>

      </> : <>
      <Link to={"/login"}>Login</Link>
   <Link to={"/signup"} >Signup</Link>
      </>}
        </nav>
    </header>
  )
}

export default NavBar