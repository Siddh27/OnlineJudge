import React, { useEffect, useState } from 'react'
import axios from 'axios'

function SubmitProblem() {

    const  [boilerplate,setBoilerPlate] = useState(`
    #include <iostream>
        int main() {
            std::cout << "Hello, World!" << std::endl;
            return 0;
        }
    `)

    const [code,setCode] = useState('')

    const [language,setLanguage] = useState('cpp')

    const [output,setOutput] = useState('')

    const [data,setData] = useState({
        title:'',
        description:'',
        author:'',
        topic:'',
        difficulty:'',
        createdAt : ''
    })



    useEffect(()=>{
        const fetchData = async()=>{
            let url  = `http://localhost:8000/api/v1/users/getProblem?title=Add two numbers`
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

    const languageHandler = (event)=>{
        let lang = event.target.value
        console.log(lang)
        setLanguage(lang)
    }

    const codeHandler = (event)=>{
        let c = event.target.value
        setCode(c)
    }

    const handleRun =  async()=>{
        let url = `http://localhost:8000/api/v1/users/runProblem`
        const response = await axios.post(url,{code,language},{
            withCredentials: true // Important: Include credentials
          });
        if(response && response.status==200 ){
            setOutput(response.data.data.output)
            
        }
    }
    
    return (
        <>
           <div className='flex h-screen bg-gray-500'>
                <div className='w-1/2 bg-slate-500  overflow-scroll'>
                    <div className='font-bold text-white text-2xl text-center italic p-3 border-black border-4 bg-slate-800'>
                        {data.title}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Description
                    </div>
                    <div className='text-white ml-3 '>
                         {data.desciption}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Topic
                    </div>
                    <div className='text-white ml-3 '>
                         {data.topic}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Difficulty
                    </div>
                    <div className='text-white ml-3 '>
                         {data.difficulty}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Author
                    </div>
                    <div className='text-white ml-3 '>
                         {data.author}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Created At
                    </div>
                    <div className='text-white ml-3 '>
                         {data.createdAt}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Input Format
                    </div>
                    <div className='text-white ml-3 '>
                         {/* {input} */}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Expected Output
                    </div>
                    <div className='text-white ml-3 '>
                         {/* {output} */}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Constraints
                    </div>
                    <div className='text-white ml-3 '>
                         {/* {constraints} */}
                    </div>
                </div>

                
                <div className='w-1/2 bg-customProblem  p-3'>
                        <div className='text-center font-bold italic p-3 text-white text-2xl'>Code</div>
                        <div className='text-center'>
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">Choose Language</label>
                                <select id="countries"
                                defaultValue={'cpp'}
                                onChange={languageHandler}
                                className="
                                bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 text-center
                                p-2.5 dark:bg-gray-700 dark:border-gray-600
                                dark:placeholder-gray-400 dark:text-white
                                    dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                                    <option value="cpp">CPP</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                </select>
                        </div>
                        <textarea className='h-2/5 w-full bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-3 mt-2' onChange={codeHandler} ></textarea>
                        <div className='text-center font-bold italic mt-8 text-white text-2xl'>Output</div>
                        <div className='bg-gray-500 h-1/5 mt-3 rounded-lg shadow-large text-white'>
                            {output}
                        </div>
                        <div className='flex justify-around mt-1'>
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleRun}>Run</button>
                            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
                        </div>
                </div>
           </div>
           <div>
            
           </div>
        </>
    )
}

export default SubmitProblem
