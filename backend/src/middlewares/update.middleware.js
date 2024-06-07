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
    let {title,description,author,topic,difficulty} =req.body;
    req.updateProblemDetails  = {}
    if(!title){
        throw new ApiError(400,"Title is required")
    }
    req.updateProblemDetails.title = title
    if(description) req.updateProblemDetails.description=description
    if(author) req.updateProblemDetails.username = author
    if(topic) req.updateProblemDetails.topic = topic
    if(difficulty) req.updateProblemDetails.difficulty = difficulty
    next()
})