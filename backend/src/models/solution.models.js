import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
    explanation:{
        type:String,
        requried:true,
    },
    code:{
        type:String,
        required:true
    },
    videoSolution:{
        type:String,//cloudinaryURl
    }
},{timestamps:true})

export const Solution = mongoose.model('Solution',solutionSchema)