import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js";

export const createUpdateDetails = asyncHandler(async (req,_,next)=>{

    const {age,username,github,organization,fullName,linkedIn}= req.body
    const updateData = {};
    if (age) updateData.age = age;
    if (organization) updateData.organization = organization;
    if (github) updateData.github = github;
    if (linkedIn) updateData.linkedIn = linkedIn;
    if(fullName) updateData.fullName=fullName
    req.updateDetails = updateData
    // console.log(req.updateDetails);
    next()
})


export const problemUpdateDetails =asyncHandler(async (req,res,next)=>{
    const {title,description,username,topic,difficulty} =req.body;
    const updateProblemDetails  = {}
    if(!title){
        throw new ApiError(400,"Title is required")
    }
    if(description) updateProblemDetails.description=description
    if(username) updateProblemDetails.username = username
    if(topic) updateProblemDetails.topic = topic
    if(difficulty) updateProblemDetails = difficulty
    req.updateProblemDetails=updateProblemDetails
    next()
})