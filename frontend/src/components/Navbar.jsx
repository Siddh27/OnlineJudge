import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Navbar() {
    const [isMenuOpen,setIsMenuOpen]  = useState(false)

    const navigate = useNavigate()
    const toggleMenu = ()=>{
        setIsMenuOpen((isMenuOpen)=>!isMenuOpen)
    }

    const handleLogout = async()=>{
        const answer = window.confirm('Are you sure you want to logout')
        if(answer){
            let logoutURL = `http://localhost:8000/api/v1/users/logout`;
            const response = await axios.post(logoutURL,{},{
                withCredentials: true // Important: Include credentials
              });
            if(response && response.status==200){
                window.alert(`User logged out successfully`);
                navigate('../../login')
            }
        }
        else{
            alert(`Error while loggin out`)
            return;
        }
    }
    return(
        <nav className='bg-customBlue p-4'>
        <div className="flex items-center justify-between">
            {/* Logo */}
           <Link to='../user/home'> <div className="text-white text-2xl font-bold">CodeEffort</div></Link>

            <div className="md:hidden">
                <button onClick={toggleMenu} className='text-white'>
                <GiHamburgerMenu className='text-2xl' /> 
                </button>
            </div>

            <ul className='hidden md:flex space-x-4 '>
                <li>
                    <NavLink to={'/user/home'} className={({ isActive }) =>isActive ? 'text-yellow-300' : 'text-white'}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={'/user/problemList'} className={({ isActive }) =>isActive ? 'text-yellow-300' : 'text-white'}>Problems</NavLink>
                </li>
                <li>
                <NavLink to={'../user/profile'} className={({ isActive }) =>isActive ? 'text-yellow-300' : 'text-white'}>MyProfile</NavLink>
                </li>
                <li onClick={handleLogout} className=' hover:shadow-lg hover:cursor-pointer text-white  hover:bg-customDark'>
                    Logout
                </li>
            </ul>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen?(
            <ul className='flex-col md:hidden'>
             <li className='py-2 hover:shadow-lg hover:bg-customDark'>
                <NavLink to={'/user/home'} className={({ isActive }) =>isActive ? 'text-yellow-300' : 'text-white'}>Home</NavLink>
            </li>
            <li className='py-2 hover:shadow-lg hover:bg-customDark'>
                <NavLink to={'/user/problemList'} className={({ isActive }) =>isActive ? 'text-yellow-300' : 'text-white'}>Problems</NavLink>
            </li>
            <li className='py-2 hover:shadow-lg hover:bg-customDark'>
            <NavLink to={'../user/profile'} className={({ isActive }) =>isActive ? 'text-yellow-300' : 'text-white'}>MyProfile</NavLink>
            </li>
            <li onClick={handleLogout} className='py-2 hover:shadow-lg hover:cursor-pointer text-white  hover:bg-customDark'>
              Logout
            </li>
        </ul>
        ):null}
    </nav>
    )
}

export default Navbar
{/* <NavLink className={ }  to='Problem'>Problems</NavLink> */}
                
// ({isActive})=>(isActive?'text-yellow-300':'')