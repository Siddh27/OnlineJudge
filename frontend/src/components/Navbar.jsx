import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";


function Navbar() {
    const [isMenuOpen,setIsMenuOpen]  = useState(false)

    const toggleMenu = ()=>{
        setIsMenuOpen((isMenuOpen)=>!isMenuOpen)
    }
    return(
        <nav className='bg-customBlue p-4'>
        <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-white text-2xl font-bold">Online Judge</div>

            <div className="md:hidden">
                <button onClick={toggleMenu} className='text-white'>
                <GiHamburgerMenu className='text-2xl' /> 
                </button>
            </div>

            <ul className='hidden md:flex space-x-4 '>
                <li>
                    <NavLink to={'Problem'} className='text-white'>Problems</NavLink>
                </li>
                <li>
                <NavLink to={'Problem'} className='text-white'>MyProfile</NavLink>
                </li>
                <li>
                <NavLink to={'Problem'} className='text-white'>Logout</NavLink>
                </li>
            </ul>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen?(
            <ul className='flex-col md:hidden'>
            <li className='py-2 hover:shadow-lg hover:bg-customDark'>
                <NavLink to={'Problem'} className='text-white'>Problems</NavLink>
            </li>
            <li className='py-2 hover:shadow-lg hover:bg-customDark'>
            <NavLink to={'Problem'} className='text-white'>MyProfile</NavLink>
            </li>
            <li className='py-2 hover:shadow-lg hover:bg-customDark'>
            <NavLink to={'Problem'} className='text-white'>Logout</NavLink>
            </li>
        </ul>
        ):null}
    </nav>
    )
}

export default Navbar
{/* <NavLink className={ }  to='Problem'>Problems</NavLink> */}
                
// ({isActive})=>(isActive?'text-yellow-300':'')