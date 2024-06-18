import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
function AdminDashBoard() {

    const [users,setUsers] = useState([{}])

    const handleAdminChange = async(id,isAdmin)=>{
        setUsers((prevUsers)=>
            prevUsers.map((user)=>
                user._id===id?{...user,isAdmin:!user.isAdmin}:user
            )
        )
        let url = `https://${import.meta.env.VITE_BACKEND_URL}/api/v1/users/adminToggle`
        const response = await axios.post(url,{id,isAdmin},{withCredentials:true})
        console.log(response)
    }

    useEffect(()=>{
        const fetchUserData = async(req,res)=>{
            let url  = `https://${import.meta.env.VITE_BACKEND_URL}/api/v1/users/getAllUsers`
            const response = await axios.get(url,{
                withCredentials:true
            })
            setUsers(response.data.data)
        }
        fetchUserData()
    },[])
    return (
        <>
         <div className='bg-slate-500 h-screen flex-col'>
         <div className='text-center font-bold pt-4 text-2xl text-white'>Admin Dashboard</div>
            {
                users.map((user)=>(
                    <div key={user._id} className='bg-customDark container mx-auto mt-9 w-2/3 text-white rounded-lg flex justify-between p-3 items-center'>
                        <div key={user.username}>Username:  {user.username}</div>
                        <div key={user.email} >
                            <span className='px-2'>Admin</span>
                            <input 
                            checked={user.isAdmin} 
                            type="checkbox" 
                            className='' 
                            onChange={()=>handleAdminChange(user._id,user.isAdmin)}
                            />
                        </div>
                    </div>
                )) 
            }
         </div>
        </>
    )
}

export default AdminDashBoard
