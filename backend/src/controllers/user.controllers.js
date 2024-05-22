import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const generateAcessAndRefreshToken = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        // this is so that we dont verify password ,email,username again 

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler( async (req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists:username,email
    // check for images,check for coverImage
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field
    // check for response creation
    // return response

    
    const {fullName,email,username,password,age,organization,github,linkedIn} =req.body

    // validation will add zod validation
    if(
        [fullName,email,username,password,organization].some((field)=>
            field?.trim()=="")
        ){
            throw new ApiError(400,"All fields are required")
        }

    // checking if user exists
    const userExists = await User.findOne({
        $or:[ {username} , {email} ]
    })
    if(userExists){
        throw new ApiError(409,"User with email or username exists")
    }

    const coverImageLocalPath = req.files?.coverImage[0]?.path

    let resumeLocalPath;
    if(req.files && Array.isArray(req.files.resume) && req.files.resume.length >0){
        resumeLocalPath = req.files.resume[0].path;
    }

    if(!coverImageLocalPath){
        throw new ApiError(400,"coverImage file is required");
    }

    const coverImage  = await uploadOnCloudinary(coverImageLocalPath)
    const resume = await uploadOnCloudinary(resumeLocalPath)
    if(!coverImage){
        throw new ApiError(400,"coverImage file is required");
    }


    const user = await User.create({
        fullName,
        resume:resume?.url,  //|| "",
        coverImage:coverImage.url,
        email,
        password,
        age:age || "",
        organization,
        github:github || "",
        linkedIn:linkedIn || "",
        username:username.toLowerCase(),
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
})

export { registerUser}