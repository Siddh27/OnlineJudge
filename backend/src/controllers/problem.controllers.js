import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Problem} from "../models/problem.models.js"
import { User } from "../models/user.models.js";
import generateFile from "../utils/generateFile.js";
import {executeCpp,executePython,executeJava} from '../utils/executeFile.js'


const addProblem = asyncHandler(async (req,res)=>{
    const {title,description,username,topic,difficulty} =req.body;
    console.log(username);
    const user =  await User.findOne({
        username
    })
    console.log(user);
    const addedProblem = await Problem.create({
        title,
        description,
        author:user._id,
        topic,
        difficulty,
    })
    console.log(addedProblem);
    if(!addedProblem){
        throw new ApiError(500,"error while adding problem")
    }
    res.status(200).json(
        new ApiResponse(200,addProblem,"problem added successfully")
    )
})

const updateProblem = asyncHandler(async (req,res)=>{
    const title = req.updateProblemDetails.title
    console.log(req.updateProblemDetails);
    const updatedProblem = await Problem.findOneAndUpdate(title,{
        $set:{
            ...req.updateProblemDetails
        }
    },{
        new:true
    })
    if(!updateProblem){
        throw new ApiError(500,"error while updating problem")
    }
    res.status(200).json(
        new ApiResponse(200,updatedProblem,"Problem updated successfully")
    )
})

const getProblem = asyncHandler(async(req,res)=>{
    const {title} = req.body
    if(!title){
        throw new ApiError(500,"title is required")
    }
    const problem = await Problem.findOne({
        title
    })
    if(!problem){
        throw new ApiError(404,"Problem doesn't exist")
    }
    res.status(200).json(
        new ApiResponse(200,problem,"Problem found sucessfully")
    )
})

const deleteProblem = asyncHandler(async(req,res)=>{
    const {title} = req.body
    if(!title){
        throw new ApiError(500,"title is required")
    }
    const problem = await Problem.findOne({
        title
    })
    if(!problem){
        throw new ApiError(404,"Problem doesn't exist")
    }
    const deletedProblem = await Problem.findOneAndDelete({
        title
    })
    if(!deletedProblem){
        throw new ApiError(500,"error while updating problem")
    }
    res.status(200).json(
        new ApiResponse(200,deletedProblem,"Problem updated successfully")
    )
})

const runProblem  = asyncHandler(async (req,res)=>{
    const {language='cpp',code } = req.body
    let  filePath;
    if(!code){
        throw new ApiError(400,"Code is required")
    }
    let output;
    try {
        filePath  = generateFile(language,code);
        
        if(language=='cpp'){
            output  = await executeCpp(filePath)
        }
        else if(language=='python'){
            output = await executePython(filePath)
        }
        else{
            output = await  executeJava(filePath)
        }
        res.status(200).json(new ApiResponse(200,{filePath,output}))
    } catch (error) {
        
    }
   
})

export {addProblem,updateProblem,getProblem,deleteProblem,runProblem}