import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { CiEdit } from "react-icons/ci";
import { useEffect } from 'react';

function UpdateProfile() {


  useEffect(()=>{
    const fetchUserData = async(req,res)=>{
        let url  = `https://${import.meta.env.VITE_BACKEND_URL}/api/v1/users/getUser`
        const response = await axios.get(url,{
            withCredentials:true
        })
        if(response && response.status==200){
            let fetchedData = response.data.data
            let updatedObject = {}
            for(let d in data){
                updatedObject[d] = fetchedData[d]
            }
            setData(updatedObject)
        }
    }
    fetchUserData()
  },[])



    const navigate  = useNavigate()

    const [data,setData] = useState({
        username:'',
        email:'',
        fullName:'',
        age:'',
        github:'',
        linkedIn : '',
        coverImage:'',
        organization:''
    })

    const handleSumbit = async()=>{
        const confirm = window.confirm('Are you sure you want to update your profile?')
        if(!confirm) return;
        let url = `https://${import.meta.env.VITE_BACKEND_URL}/api/v1/users/updateUserDetails`
        const response= await axios.patch(url,{...data},{
          withCredentials: true // Important: Include credentials
        });
        if(response && response.status==200){
        // window.alert('Problem added successfully')
        window.alert('Updated Profile SucessFully')
        navigate('../Profile')
        }
        else{
            window.alert('Some error occured while addding the problem');
        }
    }
    const handleChange = async({currentTarget:input})=>{
        setData(prevData=>(
            {
                ...prevData,
                [input.name]:input.value
            }
        ))
    }

    return (
        <>
         <div className='bg-slate-500 h-screen scroll-auto '>
            <div className='text-center text-2xl p-3 font-bold text-white italic'>
                Update Profile
            </div>
           <div className='flex flex-wrap container  w-fit h-fit mx-auto p-2 '>
              <div className=' text-white w-1/2 mb-5 text-lg'>
                <input disabled  name='username' value={data.username} onChange={handleChange} required className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Username' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <input name='email' value={data.email} onChange={handleChange} className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Email' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <input disabled name='fullName' value={data.fullName} onChange={handleChange} className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Full Name' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <input  name='age' value={data.age} onChange={handleChange} className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Age' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <input name='organization' value={data.organization} onChange={handleChange}className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Organization' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <input name='linkedIn' value={data.linkedIn} onChange={handleChange}className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='LinkedIn URL' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <input name='github' value={data.github} onChange={handleChange}className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Github URL' />
              </div>
              <div className=' text-white  w-1/2 mb-5 text-lg'>
                <input name='coverImage' value={data.coverImage} onChange={handleChange}className='bg-customDark inline-block p-2 m-2 rounded-lg shadow-lg' placeholder='Profile Image URL' />
              </div>
           </div>
           <div className='text-white ml-2  mb-5 text-lg text-center'>
              <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSumbit}>Update Profile <CiEdit className='inline text-xl' /></button>
              </div>
         </div>
        </>
    )
}

export default UpdateProfile
