import mongoose from "mongoose";


const testCaseSchema = new mongoose.Schema({
    inputTestCases:[
        {
            type:String,
            required:true
        },
    ],
    outputTestCases:[
        {
            type:String,
            required:true
        }
    ]

},{timestamps:true})


export const Testcase = mongoose.model('Testcase',testCaseSchema)