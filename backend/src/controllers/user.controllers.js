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

    console.log(req.body)
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
    
    let coverImageLocalPath;
    if(req.files?.coverImage){
       coverImageLocalPath = req.files?.coverImage[0]?.path
    }
    let resumeLocalPath;
    if(req.files && Array.isArray(req.files.resume) && req.files.resume.length >0){
        resumeLocalPath = req.files.resume[0].path;
    }
    let coverImage;
    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
    } 
    let resume;
    if (resumeLocalPath) {
        resume = await uploadOnCloudinary(resumeLocalPath)
    }
    let flag1=false
    let flag2=false
    if(resume) flag1=true
    if(coverImage) flag2=true;
    const user = await User.create({
        fullName,
        resume:flag1?resume.url:"" , //|| "",
        coverImage:flag2?coverImage.url:"",
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


const loginUser =  asyncHandler(async (req,res)=>{
    // req body data
    // check if user exists
    // compare the username and password
    // generate acess token
    // generate refresh token
    // send the acess and refresh token to the user
    // via cookies

    const {username,password} = req.body;
    if(!(username)){
        throw new ApiError(400,"username or email is required")
    }

    const user = await User.findOne({
        $or:[{username:username},{email:username}] // find based or username or email
    })

    if(!user){
        throw new ApiError(404,"user does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user Credentials");
    }

    const {accessToken,refreshToken} = await generateAcessAndRefreshToken(user._id)




    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly:true,
        secure:true,
    }
    
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,
                refreshToken
            },
            "user logged in successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req,res)=>{

    // remove the access token 
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    // clear the cookies
    const options = {
        httpOnly:true,
        secure:true,
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"user logged out")
    )
})

const changeCurrentPassword =  asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword} = req.body;

    // now like in logout i can use the user which was put in 
    // req body by verifyJWT middleware since i will be using it

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect= await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new  ApiError(400,"old password does not match")
    }
    
    user.password = newPassword
    await user.save({validateBeforeSave:false}); 

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Password changed successfully")
    )

})

const refreshAcessToken = asyncHandler(async (req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401,"No refresh token recieved or unauthorized request")
    }

    try {
        const decodedToken = jwt.decode(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id);
    
        if(!user){
            throw new ApiError(401,"unauthorized request/invalid refresh token")
        }
    
        if(incomingRefreshToken!==user?.refreshToken){
            throw new ApiError(401,"refresh token in expired or used")
        }
    
        const options = {
            httpOnly:true,
            secure:true,
        }
    
        // note that generate acces token method will create the new tokens
        // and update the refresh token also hence we are not doing it by ourselves also
        // again
        const {newAccessToken,newRefreshToken} = await generateAcessAndRefreshToken(user?._id)
        return res
        .status(200)
        .cookie("accessToken",newAccessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(200,{
                "accessToken":newAccessToken,
                "refreshToken":newRefreshToken
            },"refresh and acess tokens updated")
        )
    
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid refresh token")
    }
})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200,req.user,"fetched user sucesssfully"))
})

const updateAccountDetails = asyncHandler(async (req,res)=>{
    
    const user = await User.findByIdAndUpdate(req.user?._id,{
        $set:{
           ...req.updateDetails
        }
    }, {new:true})
    .select("-password")

    return res
    .status(200)
    .json(200, new ApiResponse(200,user,"Account Details updated successfully"))
})

export { registerUser ,loginUser ,logoutUser,changeCurrentPassword,refreshAcessToken,getCurrentUser,updateAccountDetails}