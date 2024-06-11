import * as fs from 'fs'
import {v4 as uuid} from 'uuid'
import path from 'path'
import  url  from 'url'
import { exec } from 'child_process'


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname,'output')

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true})
}

const executeCpp = (filePath,inputPath)=>{
    const jobId = path.basename(filePath).split('.')[0];
    const outputFileName = `${jobId}.exe`
    const outputPath = path.join(dirCodes,outputFileName)
    // console.log(inputPath);
    return new Promise((res,reject)=>{
        exec(
        `g++ ${filePath} -o ${outputPath} && cd ${dirCodes} && .\\${outputFileName} < ${inputPath}`,
        (error,stdout,stderr)=>{
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath)
                console.log('reached')
            }
            if(fs.existsSync(outputPath)){
                fs.unlinkSync(outputPath)
            }
            if(fs.existsSync(inputPath)){
                fs.unlinkSync(inputPath)
            }
           if(error){
             reject(error)
           } 
           if(stderr){
            reject(stderr)
           }
           res(stdout)
        }
        )
    })
}

const executePython = (filePath,inputPath)=>{
    return new Promise((res,rej)=>{
        exec(
        `python ${filePath} < ${inputPath}`,
        (error,stdout,stderr)=>{
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath)
            }
            if(fs.existsSync(inputPath)){
                fs.unlinkSync(inputPath)
            }
           if(error){
             rej(error)
           } 
           if(stderr){
            rej(stderr)
           }
           res(stdout)
        }
        )
    })
}

const executeJava = (filePath)=>{
    return new Promise((res,rej)=>{
        fs.unlinkSync(filePath)
        if(outputPath){
            fs.unlinkSync(outputPath)
        }
        exec(
        `java ${filePath}`,
        (error,stdout,stderr)=>{
           if(error){
             rej(error)
           } 
           if(stderr){
            rej(stderr)
           }
           res(stdout)
        }
        )
    })
}

export {executeCpp,executePython,executeJava}