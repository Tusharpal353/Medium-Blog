import { SigninInput } from "@tusharpal/medium";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"

const Auth = ({type}:{type: "signup" | "signin"}) => {
    
    const [userInput,setuserInput]=useState<SigninInput>({
        email:"",
        password:"",
        name:"",
    })
    
    return (
        <div className="h-screen  flex justify-center   ">
            <div className="flex justify-center flex-col">
                <div className="text-5xl font-bold  ">
                    Create an account

                </div>
                <div className="text-slate-400  text-lg my-2 pl-2 text-center ">

                    {  type === "signin" ? "Dont have an account " :"Already have an account ?" } 
                    <Link className="underline"  to={type==="signin"?  "/signup":"/signin"}> {type ==="signin" ?  "sigunup":"signin"}</Link>

                </div>
            <div>

            
            <LabelledInput label="name" placeholder="Enter your name" onChange={(e)=>{
                setuserInput({
                    ...userInput,
                    name:e.target.value
                })

            }}/>
            <LabelledInput label="email" placeholder="your@gmail.com" onChange={(e)=>{
                setuserInput({
                    ...userInput,
                    email:e.target.value
                })

            }}/>
            <LabelledInput label="password" type={"password"} placeholder="" onChange={(e)=>{
                setuserInput({
                    ...userInput,
                    password:e.target.value
                })

            }}/>
            <button type="button" className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "signin":"signup"}</button>
            </div>
            </div>

        </div>
    )
}

export default Auth



interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=> void
    type?: string
}


function LabelledInput({ label, placeholder, onChange,type }:LabelledInputType) {
    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >{label}</label>
                <input onChange={onChange} type={type || "text"} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username"  placeholder={placeholder}/>
            </div>
        </div>
    )
}

