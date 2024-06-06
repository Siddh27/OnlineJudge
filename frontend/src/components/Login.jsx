import React from 'react'
import { useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [data,setData] = useState({
        username:"",
        password:"",
    })
    const navigate = useNavigate()

    const loginButtonRef = useRef()

    const loginURL = 'http://localhost:8000/api/v1/users/login'

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(loginURL,{...data},{
                withCredentials: true // Important: Include credentials
              });
            if(response){
                const accessToken = response.data.data.accessToken
                const refreshToken = response.data.data.refreshToken
                
            }
            if(response.status==200 && loginButtonRef.current){
                loginButtonRef.current.textContent = 'Logged In!'
            }
            setData({
                username:"",
                password:"",
            })
            navigate('/user/home')
        } catch (error) {
            console.log(error)
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
    return (
        <>
          <div className='min-h-screen py-40' style={bgStyle}>
          <div className='container mx-auto '>
            <div className=' flex flex-col w-6/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
                <div className='w-full  py-16 px-12'>
                <h2 className='text-3xl mb-4 text-center '>ONLINE JUDGE</h2>
                <h2 className='text-3xl mb-4 text-center'>Login</h2>
                    <p>Please Enter username or Username. <span className='text-red-500'>* indicates required</span> </p>
                    <form>
                        <div className='mt-5'>
                        <input type="text" placeholder='username*/Username*'
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
                        <div className="mt-5">
                            <button ref={loginButtonRef} onClick={handleSubmit} className='w-full bg-yellow-300 py-3 text-center text-black'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
          </div>
          </div>
         
        </>
    )
}

export default Login
