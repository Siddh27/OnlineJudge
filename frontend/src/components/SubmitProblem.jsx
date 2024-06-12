import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CodeMirror, { ViewUpdate, keymap } from '@uiw/react-codemirror';
import { vscodeDark, vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { autocompletion } from '@codemirror/autocomplete';
import {java} from '@codemirror/lang-java'

function SubmitProblem() {

    const [outputWindow,setOutputWindow] = useState(true)
    const [inputWindow,setInputWindow] = useState(!outputWindow)
    const [input,setInput] = useState('')
    const [showVerdict,setShowVerdict] = useState(false)

    const [inputTestCases,setInputTestCases] = useState('')
    const [outputTestCases,setOutputTestCases]= useState('')


    const [verdict,setVerdict] = useState('')

    const [testCaseDisplay,setTestCaseDisplay]  = useState([{}])

    const {title} = useParams() 

    const [code,setCode] = useState('')

    const [language,setLanguage] = useState('cpp')

    const [output,setOutput] = useState('')

    const handleOutput = ()=>{
        setOutputWindow(true)
        setInputWindow(false)
        setShowVerdict(false)
    }

    const handleInput = ()=>{
        setInputWindow(true)
        setOutputWindow(false)
        setShowVerdict(false)
    }

    const handleVerdict = ()=>{
        setOutputWindow(false)
        setInputWindow(false)
        setShowVerdict(true)
    }

    const changeInputHandler = (e)=>{
        setInput(e.target.value)
    }

    const [data,setData] = useState({
        title:'',
        description:'',
        author:'',
        topic:'',
        difficulty:'',
        createdAt : '',
        inputFormat:'',
        expectedOutput:'',
        constraints:''
    })


    const [problem,setProblem] = useState({})
    const [user,setUser] = useState({})
    useEffect(()=>{
        const fetchData = async()=>{
            let url  = `http://localhost:8000/api/v1/users/getProblem?title=${title}`
            const response = await axios.get(url,{
                withCredentials:true
            })
            setProblem(response.data.data)
            if(response && response.status==200){
                const getUser = await axios.get(`http://localhost:8000/api/v1/users/getUser`,{
                withCredentials:true
                 })
                setData({...problem,author:getUser.data.data.username})
                setInputTestCases(problem.inputTestCases)
                setOutputTestCases(problem.outputTestCases)
                setUser(getUser.data.data)
            }
        }
        fetchData()
    },[])

    const languageHandler = (event)=>{
        // window.location.reload()
        setOutput('')
        setCode('')
        let lang = event.target.value
        setLanguage(lang)
    }

    const handleRun =  async()=>{
        if(code==''){
            setOutput('No Code!');
            return;
        }
        setOutput('')
        handleOutput()
        try {
            let url = `http://localhost:8000/api/v1/users/runProblem`
            const response = await axios.post(url,{code,language,input},{
                withCredentials: true // Important: Include credentials
              });
            if(response){
                if(response.status==200){
                    setOutput(response.data.data.output)
                }
            }
        } catch (error) {
            if(language=='cpp'){
                let word = "error:"
                const compileMessage = error.response.data.data
                let index = compileMessage.indexOf(word);
                let result = compileMessage.slice(index + word.length);
                setOutput(result.trim())
            }
            if(language=='java')
            {
                let word = 'java'
                const compileMessage  =error.response.data.data
                let index = compileMessage.indexOf(word);
                let result = compileMessage.slice(index + word.length);
                setOutput(result.trim())
            }
            if(language=='python'){
                let word = ','
                const compileMessage  =error.response.data.data
                let index = compileMessage.indexOf(word);
                let result = compileMessage.slice(index + word.length);
                setOutput(result.trim())
            }
        }
    }

    const handleSubmit = async()=>{
        if(code==''){
            handleOutput()
            setOutput('No Code!')
            return;
        }
        setTestCaseDisplay([{}])
        setOutput('')
        handleVerdict()
        setVerdict(false)
        try {
            let url = `http://localhost:8000/api/v1/users/runProblem`
            let inputArr =  inputTestCases.split('\n')
            let outputArr = outputTestCases.split('\n')
            for(let i=0;i<inputArr.length;i++){
                let inputTestCase = inputArr[i].trim();
                let outputTestCase =outputArr[i].trim();
                const response = await axios.post(url,{code,language,input:inputTestCase},{
                    withCredentials: true // Important: Include credentials
                  });
                if(response.data.data.output.trim()==outputTestCase){
                    setTestCaseDisplay(prevTestCaseDisplay =>[
                        ...prevTestCaseDisplay,
                        {
                            title:`test case ${i+1}`,
                            color:'bg-green-400',
                            id:i+1
                        }
                    ])
                }
                else{
                    setTestCaseDisplay(prevTestCaseDisplay =>[
                        ...prevTestCaseDisplay,
                        {
                            title:`test case ${i+1}`,
                            color:'bg-red-400',
                            id:i+1
                        }
                    ])
                    return;
                }
            }
            setVerdict(true)
            const submission = await axios.post(`http://localhost:8000/api/v1/users/addSubmission`,{user:user._id,verdict:true,problem:problem._id},{withCredentials:true})
        } catch (error) {
            handleOutput()
            if(language=='cpp'){
                let word = "error:"
                const compileMessage = error.response.data.data
                let index = compileMessage.indexOf(word);
                let result = compileMessage.slice(index + word.length);
                setOutput(result.trim())
            }
            if(language=='java')
            {
                let word = 'java'
                const compileMessage  =error.response.data.data
                let index = compileMessage.indexOf(word);
                let result = compileMessage.slice(index + word.length);
                setOutput(result.trim())
            }
            if(language=='python'){
                let word = ','
                const compileMessage  =error.response.data.data
                let index = compileMessage.indexOf(word);
                let result = compileMessage.slice(index + word.length);
                setOutput(result.trim())
            } 
        }
    }
    
    return (
        <>
           <div className='flex h-screen bg-gray-500'>
                <div className='w-1/2 bg-slate-500  overflow-auto'>
                    <div className='font-bold text-white text-2xl text-center italic p-3 border-black border-4 bg-slate-800'>
                        {data.title}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Description
                    </div>
                    <div className='text-white ml-3 '>
                         {data.description}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Topic
                    </div>
                    <div className='text-white ml-3 '>
                         {data.topic}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Difficulty
                    </div>
                    <div className='text-white ml-3 '>
                         {data.difficulty}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Author
                    </div>
                    <div className='text-white ml-3 '>
                         {data.author}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Created At
                    </div>
                    <div className='text-white ml-3 '>
                         {data.createdAt}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Input Format
                    </div>
                    <div className='text-white ml-3 '>
                         {data.inputFormat}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Expected Output
                    </div>
                    <div className='text-white ml-3 '>
                         {data.expectedOutput}
                    </div>
                    <div className='m-3 text-lg text-slate-1000 underline'>
                        Constraints
                    </div>
                    <div className='text-white ml-3 '>
                         {data.constraints}
                    </div>
                </div>

                
                <div className='w-1/2 bg-customProblem  p-3 overflow-auto'>
                        <div className='text-center font-bold italic p-3 text-white text-2xl'>Code</div>
                        <div className='text-center'>
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">Choose Language</label>
                                <select id="countries"
                                defaultValue={'cpp'}
                                onChange={languageHandler}
                                className="
                                bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 text-center
                                p-2.5 dark:bg-gray-700 dark:border-gray-600
                                dark:placeholder-gray-400 dark:text-white
                                    dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                                    <option value="cpp">CPP</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                </select>
                        </div>
                        {language=='python'?<CodeMirror 
                        theme={vscodeDark}
                        extensions={[python(),autocompletion()]}
                        height='500px'
                        onChange={(value,ViewUpdate)=>{
                            setCode(value)
                        }}
                        className='my-2'
                        
                         />:''}
                         {language=='cpp'?<CodeMirror 
                        theme={vscodeDark}
                        extensions={[cpp(),autocompletion()]}
                         height='500px'
                        onChange={(value,ViewUpdate)=>{
                            setCode(value)
                        }}
                        className='my-2'
                         />:''}

                        {language=='java'?<CodeMirror 
                        theme={vscodeDark}
                        extensions={[java(),autocompletion()]}
                          height='500px'
                        onChange={(value,ViewUpdate)=>{
                            setCode(value)
                        }}
                        className='my-2'
                        />:''}
                        
                        <div className={`border-t border-x w-fit font-bold italic mt-8 text-white text-2xl inline  ${outputWindow?'bg-customDark':''} rounded-t`} onClick={handleOutput}>Output</div>
                        <div className={`border-t border-x w-fit font-bold italic mt-8 text-white text-2xl inline ${inputWindow?'bg-customDark':''} ml-1 `} onClick={handleInput} value={input}>Input</div>
                        <div className={`border-t border-x w-fit font-bold italic mt-8 text-white text-2xl inline ${showVerdict?'bg-customDark':''} ml-1 `} onClick={handleVerdict} value={input}>Verdict</div>
                        {showVerdict?<div className={`w-fit font-bold italic mt-8 ${verdict?'text-green-400':'text-red-400'} text-2xl inline ${verdict==='passed'} ml-1 `}>{verdict?'Passed':'Failed'}</div>:''}
                        {outputWindow?<div className='bg-gray-500 h-1/5 mt-3 rounded-lg shadow-large text-white overflow-auto'>
                            {output}
                        </div>:''}
                        {inputWindow?<textarea onChange={changeInputHandler} className='bg-gray-500 h-1/5 mt-3 flex  rounded-lg shadow-large w-full p-3'></textarea>:''}
                        {showVerdict?<div className='bg-gray-500 h-1/5 mt-3 rounded-lg shadow-large  text-white'>
                            {
                                testCaseDisplay.map((testcase)=>(
                                        <div key={testcase.id} className={`${testcase.color} text-black text-sm w-fit rounded-md inline-block mx-1 p-1 shadow-md`}>
                                            {testcase.title} 
                                        </div>
                                ))
                            }
                        </div>:''}
                        <div className='flex justify-around mt-1'>
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleRun}>Run</button>
                            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSubmit}>Submit</button>
                        </div>
                </div>
           </div>
           <div>
            
           </div>
        </>
    )
}

export default SubmitProblem
