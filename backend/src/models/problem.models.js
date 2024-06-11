import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    topic:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        enum:['Easy','Medium','Hard'],
        required:true,
    },
    inputTestCases:{
        type:String,
    },
    outputTestCases:{
        type:String
    },
    inputFormat:{
        type:String
    },
    expectedOutput:{
        type:String
    },
    constraints:{
        type:String
    }
    // submissions , acceptance rate needs to be calculated,submissions

},{timestamps:true})


export const Problem = mongoose.model('Problem',problemSchema)