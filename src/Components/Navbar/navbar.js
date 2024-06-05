
import { Link, Outlet } from 'react-router-dom';
/** ------------------ IMPORTING HOOKS ------------------ **/
import { useValue } from '../../context';




/** ------------------ Function to show the Navbar ------------------ **/
function Navbar() {
  const {isLoggedIn,handleLogout}=useValue();
  
  
  return (
    <>
      <div className='flex flex-row bg-blue-400 py-3 px-2'>
        <div id="logo" className='w-3/4 font-extrabold'><a href="/">Authentication App </a></div>
       
        
      </div>
      <Outlet />
    </>
  );
}

/** ------------------ EXPORTING MODULES ------------------ **/
export default Navbar;
