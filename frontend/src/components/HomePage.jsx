import React, { useEffect } from 'react'
import {useTypewriter,Cursor, Typewriter} from 'react-simple-typewriter'
import HomePageCoding from '../assets/HomePageCoding.jpg'
import { FaArrowRightLong } from "react-icons/fa6";
import friendship from '../assets/friendship.jpg'
import { Link } from 'react-router-dom';
function HomePage() {
    const {text}  = useTypewriter({
        words:['CodeEffort',''],
        loop:{},
        typeSpeed:120,
        deleteSpeed:80
    })
    return (
        <>
        <div className='flex h-screen justify-between items-center bg-slate-500'>
            <div className='text-7xl text-white mx-auto '>
                <Typewriter words={['CodeEffort']} loop={false} cursor={true} typeSpeed={120} deleteSpeed={80} />
                <div className='text-xl text-white'>
                    A Platform where you can solve problems and Learn...
                </div>
                <Link to='../ProblemList'><button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Start Solving! &nbsp; <FaArrowRightLong className='inline'/></button></Link>
            </div>
            <div className='border w-1/2 bg-slate-500'>
                <img src={HomePageCoding} alt=""  className=''/>
            </div>
        </div>
        <div className='bg-slate-500 flex items-center justify-between'>
            <div className='w-1/2'><img src={friendship} alt="" /></div>
            <div className='text-5xl text-white mx-auto'>Solve with friends!</div>
        </div>
        </>
    )
}

export default HomePage
