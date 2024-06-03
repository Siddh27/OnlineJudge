import React, { useRef, useState } from 'react'
import codingImage from '../assets/codingImage.png'
import {Link, useNavigate} from 'react-router-dom'
import axios  from 'axios'
function SignUp() {
    const [data,setData] = useState({
        fullName:"",
        age:"",
        username:"",
        organization:"",
        email:"",
        github:"",
        linkedIn:"",
        password:"",
    })

    const [filledCorrectly,setfilledCorrectly] = useState(true)
    const [responseMessage,setResponseMessage] = useState('')

    const navigate = useNavigate()

    const registerButtonRef = useRef()

    const registerURL = 'http://localhost:8000/api/v1/users/register'

    const handleSubmit = async(e)=>{
        e.preventDefault()
        let response;
        try {
             response= await axios.post(registerURL,{...data});
            if(response){
                console.log(response.data.message)
            }
            if(registerButtonRef.current){
                registerButtonRef.current.textContent = 'Registered!'
            }
            setData({
                fullName:"",
                age:"",
                username:"",
                organization:"",
                email:"",
                github:"",
                linkedIn:"",
                password:"",
            })
            navigate('/login')
        } catch (error) {
            console.log(error.message)
            // setResponseMessage(response.data.message)
        }
    }

    const handleChange = ({currentTarget:input})=>{
        setData(prevData=>(
            {
                ...prevData,
                [input.name]:input.value
            }
        ))
        
    }

    const bgStyle = {
        backgroundImage:'linear-gradient(115deg,#050C9C,#A7E6FF)'
    }

    const bgImageStyle = {
        backgroundImage:`url(${codingImage})`
    }
    return (
        <>
          <div className='min-h-screen py-40' style={bgStyle}>
          <div className='container mx-auto '>
            <div className=' flex flex-col lg:flex-row w-10/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
                <div className='w-full lg:w-1/2  bg-no-repeat bg-cover bg-center' style={bgImageStyle}>
                </div>
                <div className='w-full lg:w-1/2 py-16 px-12'>
                <h2 className='text-3xl mb-4 text-center '>ONLINE JUDGE</h2>
                <h2 className='text-3xl mb-4'>Register</h2>
                    <p>Create Your Account to Solve Problems!</p>
                    <form>
                        <div className='grid grid-cols-1 gap-5'>
                        <input type="text" placeholder='Full Name*'
                        className='border border-gray-400 py-1 px-2 w-full'
                          value={data.fullName}
                          name='fullName'
                          required
                          onChange={handleChange}
                        />
                        </div>
                        <div className='mt-5'>
                        <input type="text" placeholder='Email*'
                        className='border border-gray-400 py-1 px-2 w-full'
                        name='email'
                        value={data.email}
                        required
                        onChange={handleChange}
                        />
                        </div>
                        <div className='mt-5'>
                        <input type="text" placeholder='Username*'
                        className='border border-gray-400 py-1 px-2 w-full'
                        name='username'
                        value={data.username}
                        required
                        onChange={handleChange}
                        />
                        </div>
                        <div className='mt-5'>
                        <input type="password" placeholder='Password*'
                        className='border border-gray-400 py-1 px-2 w-full'
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        />
                        </div>
                        <div className='grid grid-cols-2 mt-5'>
                        <input type="text" placeholder='Age'
                        className='border border-gray-400 py-1 px-2 '
                        name='age'
                        value={data.age}
                        onChange={handleChange}
                        />
                        <input type="text"
                         placeholder='Organization'
                         className='border border-gray-400 py-1 px-2 ml-2'
                         name='organization'
                        value={data.organization}
                        onChange={handleChange}
                         />
                        </div>
                        <div className='mt-5'>
                        <input type="text" 
                        placeholder='LinkedInURL'
                        className='border border-gray-400 py-1 px-2 w-full'
                        name='linkedIn'
                        value={data.linkedIn}
                        onChange={handleChange}
                        />
                        </div>
                        <div className='mt-5'>
                        <input type="text" 
                        placeholder='GithubURL'
                        className='border border-gray-400 py-1 px-2 w-full'
                        name='github'
                        value={data.github}
                        onChange={handleChange}
                        />
                        </div>
                        <div className="mt-5">
                            <button ref={registerButtonRef} onClick={handleSubmit} className='w-full bg-yellow-300 py-3 text-center text-white'>Register</button>
                        </div>
                        {!filledCorrectly && <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span class="block sm:inline">{responseMessage}</span>
                            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                            </div>
                        }
                    </form>
                </div>
            </div>
          </div>
          </div>
         
        </>
    )
}

export default SignUp
