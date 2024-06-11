import React, { useEffect } from "react";
import axios from 'axios'
import { useState } from "react";
import blankProfile from '../assets/blankProfile.png'
import { Link } from "react-router-dom";

function ProfilePage() {


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

    const handleUpdate = ()=>{
        navigate('/updateProfile')
    }

    useEffect(()=>{
        const fetchUserData = async(req,res)=>{
            let url  = `http://localhost:8000/api/v1/users/getUser`
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
    })

  return (
    <>
      <div className="bg-slate-500 h-screen text-white">
      <div className='text-center text-2xl p-3 font-bold text-white italic'>
                My Profile
            </div>
        <div className="container flex mx-auto  h-3/4 rounded-lg shadow-lg bg-blue-900">
            <div className=" w-1/3 ">
                <div className=" w-2/4 h-1/4 mt-4 mx-auto">
                    <img  className = 'w-full  h-full object-cover' src={data.coverImage?data.coverImage:blankProfile} alt="" />
                </div>
                <div className="text-center pt-5 text-xl font-bold italic">
                    LinkedIn
                    <div className="text-white">
                    <a  className="underline" target="_blank" href={`https://${data.linkedIn}`}>{data.linkedIn}</a>
                    </div>
                </div>
                <div className="text-center pt-5 text-xl font-bold italic">
                    Github
                    <div className="text-white">
                        <a className="underline"  target="_blank" href={`https://${data.github}`}>{data.github}</a>
                    </div>
                </div>
            </div>
            <div className="  w-2/3 ">
                <div className=" flex justify-around h-fit w-full p-3  my-4  ">
                    <div className="text-xl font-bold italic">Username</div>
                    <div className=" w-2/4 text-center text-white text-lg overflow-auto">{data.username}</div>
                </div>
                <div className=" flex justify-around h-fit w-full p-3  my-4 ">
                    <div className="text-xl font-bold  italic">Email</div>
                    <div className=" w-2/4 text-center text-white text-lg overflow-auto">{data.email}</div>
                </div>
                <div className=" flex justify-around h-fit w-full p-3  my-4  ">
                    <div className="text-xl font-bold italic">Full Name</div>
                    <div  className=" w-2/4 text-center text-white text-lg overflow-auto">{data.fullName}</div>
                </div>
                <div className=" flex justify-around h-fit w-full p-3  my-4  ">
                    <div className="text-xl font-bold italic">Age</div>
                    <div  className=" w-2/4 text-center text-white text-lg overflow-auto">{data.age}</div>
                </div>
                <div className=" flex justify-around h-fit w-full p-3  my-4 ">
                    <div className="text-xl font-bold italic">Organization</div>
                    <div className=" w-2/4 text-center text-white text-lg overflow-auto">{data.organization}</div>
                </div>
            </div>
        </div>
        <div className="text-center py-5">
            <Link to={'../updateProfile'}><button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button></Link>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
