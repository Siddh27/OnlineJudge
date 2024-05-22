import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    problem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
        required:true
    },
    verdict:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    testcaseFailed:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Testcase"
    }
},{timestamps:true})


export const Submission = mongoose.model('Submission',submissionSchema)