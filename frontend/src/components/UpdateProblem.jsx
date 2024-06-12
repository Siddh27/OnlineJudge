import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UpdateProblem() {
    const [data,setData] = useState({
        title:'',
        description:'',
        author:'',
        topic:'',
        difficulty:'Easy',
        inputTestCases:'',
        outputTestCases:'',
        inputFormat:'',
        expectedOutput:'',
        constraints:'',
    })

    const navigate = useNavigate()

   const {title} = useParams() 


   useEffect(()=>{
    const fetchData = async()=>{
        let url  = `http://localhost:8000/api/v1/users/getProblem?title=${title}`
        const response = await axios.get(url,{
            withCredentials:true
        })
        if(response && response.status==200){
            const getUser = await axios.get(`http://localhost:8000/api/v1/users/getUser`,{
            withCredentials:true
             })
            const problem = response.data.data
            setData({...problem,author:getUser.data.data.username})
        }
    }
    fetchData()
    },[])


    const handleChange = async({currentTarget:input})=>{
        setData(prevData=>(
            {
                ...prevData,
                [input.name]:input.value
            }
        ))
    }

    const handleSubmit = async ()=>{
        if(data.author==''){
            window.alert('Author is required and it has to be username same as created ')
            return;
        }
        let url = `http://localhost:8000/api/v1/users/updateProblem`
        const response= await axios.patch(url,{...data},{
            withCredentials: true // Important: Include credentials
            
          });
        if(response && response.status==200){
        window.alert('Updated Problem SucessFully')
        navigate('../ProblemList')
        }
        else{
            window.alert('Some error occured while addding the problem');
        }
    }


    return (
        <>
         <div className='bg-slate-500 h-screen '>
            <div className='text-center text-2xl p-3 font-bold text-white italic'>
                Update Problem
            </div>
           <div className='flex flex-wrap container  w-fit h-fit mx-auto p-2 '>
              <div className=' text-white w-1/2 mb-5 text-lg'>
                <input disabled name='title' value={data.title} onChange={handleChange} required className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Title' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <input name='description' value={data.description} onChange={handleChange} className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Description' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <input disabled name='author' value={data.author} onChange={handleChange} className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Author which is Username' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <input name='topic' value={data.topic} onChange={handleChange}className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Topic' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <textarea name='inputTestCases' value={data.inputTestCases} onChange={handleChange}className='bg-customDark inline-block p-2  rounded-lg overflow-auto w-full shadow-lg' placeholder='inputTestCases' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <textarea name='outputTestCases' value={data.outputTestCases} onChange={handleChange}className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='outputTestCases' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <textarea name='inputFormat' value={data.inputFormat} onChange={handleChange}className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Input Format' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <textarea name='expectedOutput' value={data.expectedOutput} onChange={handleChange}className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='ExpectedOutput' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <textarea name='constraints' value={data.constraints} onChange={handleChange}className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Constraints' />
              </div>
              <div className=' text-white ml-2 w-1/2 mb-5 text-lg'>
              <label htmlFor="countries" className="block mb-2 text-lg font-medium text-customDark ">Difficulty</label>
                                <select id="countries"
                                defaultValue={'cpp'}
                                name='difficulty' value={data.difficulty} onChange={handleChange}
                                className="
                                bg-customDark border border-gray-300 text-gray-400 text-md rounded-lg p-2.5 ">
                                    <option value="Easy" onClick={()=>setData({...data,difficulty:"Easy"})}>Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
              </div>
           </div>
           <div className='text-white ml-2  mb-5 text-lg text-center'>
              <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSubmit}>Update Problem</button>
              </div>
         </div>
        </>
    )
}

export default UpdateProblem
