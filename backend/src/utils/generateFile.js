import * as fs from 'fs'
import {v4 as uuid} from 'uuid'
import path from 'path'
import  url  from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname,'codes') // C:\Users\fenil\OneDrive\Desktop\SiddhCoding\AlgoUni\OnlineJudge\backend\src\utils\codes

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true})
}

const generateFile = (language,code)=>{
    const jobId = uuid()
    let extension;
    if(language=='cpp'){
        extension = '.cpp'
    }
    else if(language=='python'){
       extension = '.py'
    }
    else{
        extension = '.java'
    }
    const filename = jobId+extension
    const filepath = path.join(dirCodes,filename)
    fs.writeFileSync(filepath,code);
    return filepath
}


export default generateFile