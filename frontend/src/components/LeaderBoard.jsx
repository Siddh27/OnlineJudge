import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
function LeaderBoard() {
    const [users,setUsers] = useState([{}])
    useEffect(()=>{
        const fetchUserData = async(req,res)=>{
            let url  = `https://${import.meta.env.VITE_BACKEND_URL}/api/v1/users/getAllUsers`
            const response = await axios.get(url,{
                withCredentials:true
            })
            const fetchedUsers = response.data.data
            // console.log(fetchedUsers)
            fetchedUsers.sort((a, b) => b.numberOfproblemsSolved - a.numberOfproblemsSolved);
            setUsers(fetchedUsers)
            // console.log(fetchedUsers)
        }
        fetchUserData()
    },[])

    return (
        <>
         <div className='bg-slate-500 h-screen flex-col'>
         <div className='text-center font-bold pt-4 text-2xl text-white'>LeaderBoard</div>
            {
                users.map((user)=>(
                    <div key={user._id} className='bg-customDark container mx-auto mt-9 w-2/3 text-white rounded-lg flex justify-between p-3 items-center'>
                        <div key={user.username}>Username:  {user.username}</div>
                        <div key={user.email} >
                            <span className='px-2'>No of Problems Solved:</span>
                            <span>{user.numberOfproblemsSolved}</span>
                        </div>
                    </div>
                )) 
            }
         </div>
        </>
    )
}

export default LeaderBoard
