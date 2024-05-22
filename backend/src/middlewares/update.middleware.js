import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"

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