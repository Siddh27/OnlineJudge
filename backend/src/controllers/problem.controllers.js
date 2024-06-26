import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Problem} from "../models/problem.models.js"
import { User } from "../models/user.models.js";
import generateFile from "../utils/generateFile.js";
import {executeCpp,executePython,executeJava} from '../utils/executeFile.js'
import generateInputFile from "../utils/generateInputFile.js";
import { Submission } from "../models/submissions.model.js";

const addProblem = asyncHandler(async (req,res)=>{
    const {title,description,author,topic,difficulty,inputTestCases,outputTestCases,inputFormat,expectedOutput,constraints} =req.body;
    const user =  await User.findOne({
        username:author
    })
    // console.log('reached here',author,user)
    const addedProblem = await Problem.create({
        title,
        description,
        author:user._id,
        topic,
        difficulty,
        inputTestCases,
        outputTestCases,
        inputFormat,
        expectedOutput,
        constraints
    })
    // console.log(addedProblem);
    if(!addedProblem){
        throw new ApiError(500,"error while adding problem")
    }
    res.status(200).json(
        new ApiResponse(200,addProblem,"problem added successfully")
    )
})

const updateProblem = asyncHandler(async (req,res)=>{
    const title = req.updateProblemDetails.title
    const updatedProblem = await Problem.findOneAndUpdate({
        title:title
    },{
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
    const title = req.query.title
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
    const {language='cpp',code,input} = req.body
    let  filePath;
    if(!code){
        throw new ApiError(400,"Code is required")
    }
    let output;
    try {
        filePath  = await generateFile(language,code);
        const inputPath = await generateInputFile(input)
        if(language=='cpp'){
            output  = await executeCpp(filePath,inputPath)
        }
        if(language=='python'){
            output = await executePython(filePath,inputPath)
        }
        if(language=='java'){
            // console.log(language);
            output = await  executeJava(filePath,inputPath)
            console.log(output);
        }
        res.status(200).json(new ApiResponse(200,{filePath,output}))
    } catch (error) {
        res.status(400).json(new ApiResponse(200,error.stderr))
    }
   
})

const getAllProblems  = asyncHandler(async (req,res)=>{
    const problems = await Problem.find()
    res.status(200).json(new ApiResponse(200,problems,'fetched all problems'))
})


const addSubmission = asyncHandler(async(req,res)=>{
    const {problem,verdict,user}  = req.body
    if(verdict==false){
        res.status(200).json(
            new ApiResponse(200,{},"Failed Submission")
        )
        return
    }
    const successfulSubmission = await Submission.findOne({
        user,
        problem,
        verdict
    })
    if(successfulSubmission){
        res.status(200).json(
            new ApiResponse(200,{},"Already Submitted")
        )
        return
    }
    else{
        const submission = await Submission.create({
            problem,
            verdict,
            user
        })
        await User.findByIdAndUpdate(user,{
            numberOfproblemsSolved:req.user.numberOfproblemsSolved+1
        })
        res.status(200).json(
            new ApiResponse(200,{submission},"New Successful Submission")
        )
    }
    
   
})

const getProblemAuthor = asyncHandler(async (req,res)=>{
    // console.log(req.body);
    const userid = req.body.authorId
    const user = await User.findById(userid)
    res.status(200).json(new ApiResponse(200,user.username,"success"))
})


export {addProblem,updateProblem,getProblem,deleteProblem,runProblem,getAllProblems,addSubmission,getProblemAuthor}