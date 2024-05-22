import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    topic:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        enum:['Easy','Medium','Hard'],
        required:true
    },
    testcase:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TestCase"
    }
    // submissions , acceptance rate needs to be calculated,submissions

},{timestamps:true})


export const Problem = mongoose.model('Problem',problemSchema)