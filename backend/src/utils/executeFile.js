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
    const outputFileName = `${jobId}.out`
    const outputPath = path.join(dirCodes,outputFileName)
    // console.log(inputPath);
    return new Promise((res,reject)=>{
        exec(
        `g++ ${filePath} -o ${outputPath} && cd ${dirCodes} && ./${outputFileName} < ${inputPath}`,
        (error,stdout,stderr)=>{
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath)
                // console.log('reached')
            }
            if(fs.existsSync(outputPath)){
                fs.unlinkSync(outputPath)
            }
            if(fs.existsSync(inputPath)){
                fs.unlinkSync(inputPath)
            }
           if(error){
             reject({error,stderr})
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
    const options = {
        timeout: 5000, // Timeout in milliseconds (e.g., 5000ms = 5s)
        // maxBuffer: 1024 * 1024 // Maximum buffer size in bytes (e.g., 1MB)
    };
    return new Promise((res,reject)=>{
        exec(
        `python ${filePath} < ${inputPath}`,options,
        (error,stdout,stderr)=>{
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath)
            }
            if(fs.existsSync(inputPath)){
                fs.unlinkSync(inputPath)
            }
            if(error){
                if(error.killed){
                    reject('Took too long time to run...')
                }
                reject({error,stderr})
            } 
            if(stderr){
            reject(stderr)
            }
            res(stdout)
        }
        )
    })
}

const executeJava = (filePath,inputPath)=>{
    return new Promise((res,reject)=>{
        exec(
        `java ${filePath} < ${inputPath}`,
        (error,stdout,stderr)=>{
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath)
            }
            if(fs.existsSync(inputPath)){
                fs.unlinkSync(inputPath)
            }
            if(error){
                reject({error,stderr})
            } 
            if(stderr){
            reject(stderr)
            }
            res(stdout)
        }
        )
    })
}

export {executeCpp,executePython,executeJava}