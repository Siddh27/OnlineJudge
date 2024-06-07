import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function ProblemList() {

        const [problems,setProblems] = useState([])

        const navigate = useNavigate()

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


    const handleDelete = async(title)=>{
        const answer = window.confirm('Are you sure you want to delete this problem it cannot be recovered later!')
        try {
            if(answer){
                let deleteURL = `http://localhost:8000/api/v1/users/deleteProblem`
                const response = await axios.delete(deleteURL,{title:title},{withCredentials:true})
                if(response && response.status==200){
                    alert('Problem deleted Successfully')
                    Navigate('../user/ProblemList')
                }
                else{
                    throw new Error()
                }
            }
        } catch (error) {
            alert('Error occured while deleting')
        }
    }


    return (
        < >
          <div className='border bg-slate-500 h-screen'>
            <div className='text-center font-bold pt-4 text-2xl text-white'>Problem List </div>
            {
                problems.map((problem)=>(
                    <div  key={problem.title} className='bg-customDark container mx-auto mt-9 w-2/3 text-white rounded-lg flex justify-between p-3 items-center'>
                        {problem.title}
                    <div className='flex justify-around  w-1/5'>
                    <Link to={`../submit/${problem.title}`}> <FaPlay onClick={()=>handleSubmit(problem.title)}/></Link>
                    <Link to={`../updateProblem/${problem.title}`}><MdEdit /></Link>
                    <button onClick={()=>handleDelete(problem.title)}><MdDelete /></button>
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
