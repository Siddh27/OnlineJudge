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
        coverImage:"",
    })

    const requiredTofill = ['fullName','email','username','password']
    

    const navigate = useNavigate()

    const registerButtonRef = useRef()

    const registerURL = `https://${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`

    const handleSubmit = async(e)=>{
        e.preventDefault()
        for(const field of requiredTofill){
           if(data[field]==''){
             window.alert(`${field} is required`)
             break;
           }
        }
        try {
            const config = {
                headers: {
                  'content-type': 'multipart/form-data',
                },
              };
            const  response= await axios.post(registerURL,{...data});
            if(response){
                window.alert(response.data.message)
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
                coverImage:""
            })
            navigate('/login')
        } catch (error) {
            window.alert(error.response.data.message)
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
                        <input type="text" 
                        placeholder='Profile Image url it should be viewable'
                        className='border border-gray-400 py-1 px-2 w-full'
                        name='coverImage'
                        value={data.coverImage}
                        onChange={handleChange}
                        />
                        </div>
                        <div className="mt-5">
                            <button ref={registerButtonRef} onClick={handleSubmit} className='w-full bg-yellow-300 py-3 text-center text-white'>Register</button>
                        </div>
                    </form>
                   <span className='text-red-600 text-lg'> Already a user? Click <Link to='../login' className='underline text-blue-400'>here</Link> to Login</span>
                </div>
            </div>
          </div>
          </div>
         
        </>
    )
}

export default SignUp
