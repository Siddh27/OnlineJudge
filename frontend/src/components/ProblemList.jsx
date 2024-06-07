import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';


function ProblemList() {

        const [problems,setProblems] = useState([])

        useEffect(()=>{
            const getProblems = async()=>{
                let url  = `http://localhost:8000/api/v1/users/getAllProblems`
                const response = await axios.get(url,{
                    withCredentials:true
                })
                if(response && response.status==200){
                    setProblems(response.data.data)
                }
            }

            getProblems()
    },[])


    return (
        < >
          <div className='border bg-slate-500 h-screen'>
            <div className='text-center font-bold pt-4 text-2xl text-white'>Problem List </div>
            {
                problems.map((problem)=>(
                    <div  key={problem.title} className='bg-customDark container mx-auto mt-9 w-2/3 text-white rounded-lg flex justify-between p-3 items-center'>
                        {problem.title}
                    <div className='flex justify-around  w-1/5'>
                    <MdEdit />
                    <Link to={`../submit/${problem.title}`}> <FaPlay onClick={()=>handleSubmit(problem.title)}/></Link>
                    </div>
                </div>
                ))
            }
            <div className='text-center mt-5'>
            <Link to={`../addProblem`}><button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Problem</button></Link>
            </div>
         </div>
         
        </>
    )
}

export default ProblemList
