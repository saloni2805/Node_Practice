import { NavLink } from "react-router"

const Navbar = () => {
  return (
    <div>



        <NavLink to='/'> Home</NavLink>
        <NavLink to='/userdata'> Userdata</NavLink>
      
    </div>
  )
}

export default Navbar
