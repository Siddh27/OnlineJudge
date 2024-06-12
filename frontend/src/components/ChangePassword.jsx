import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function ChangePassword() {
    const navigate = useNavigate()
    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')

    const handleOldPass = (e)=>{
        setOldPassword(e.target.value)
    }

    const hanldeNewPass = (e)=>{
        setNewPassword(e.target.value)
    }   

    const handleSubmit = async()=>{
        try {
            let url  = `http://localhost:8000/api/v1/users/changePassword`
            let response = await axios.post(url,{oldPassword,newPassword},{withCredentials:true})
            window.alert(response.data.message)
            navigate('../profile')
            
        } catch (error) {
            window.alert(error.response.data.message)
        }

    }

    return (
        
        <>
         <div className='bg-slate-500 h-screen flex-col '>
            <div></div>
            <div className='bg-blue-900 h-fit w-fit mx-auto border mt-1'>
                <div className=' text-white w-1/2 mb-5 text-lg '>
                        <input  
                        name='oldPassword' 
                         required 
                         className='bg-customDark 
                         inline-block p-2 m-2 rounded-lg
                          shadow-lg' 
                        placeholder='Old Password'
                        onChange={handleOldPass}
                        type='password'
                         />
                </div>
                <div className=' text-white w-1/2 mb-5 text-lg '>
                        <input 
                        name='newPassword'
                        required 
                        className='bg-customDark
                        inline-block p-2 m-2 rounded-lg 
                        shadow-lg' placeholder='New Password' 
                        type='password'
                        onChange={hanldeNewPass}
                            />
                </div>
            </div>
            <div className='text-center mt-3'>
            <button onClick={handleSubmit} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 " >Change Password<CiEdit className='inline text-xl' /></button>
            </div>
         </div>
        </>
    )
}

export default ChangePassword
