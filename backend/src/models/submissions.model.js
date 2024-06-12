import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    problem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
        required:true
    },
    verdict:{
        type:Boolean,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
},{timestamps:true})


export const Submission = mongoose.model('Submission',submissionSchema)