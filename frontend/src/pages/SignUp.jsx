import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"

import axios from "axios"



export const SignUp=()=> {

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [userName,setUserName]=useState("");
    const [password,setpassword]=useState("");


    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"} />
                <Subheading label={"Enter your informstion to make an account"} />
                <InputBox onChange={e=>{setFirstName(e.target.value)}} placeholder="Aryan" label={"First Name"} />
                <InputBox onChange={e=>{setLastName(e.target.value)}} placeholder="Dadwal" label={"Last Name"} />
                <InputBox onChange={e=>{setUserName(e.target.value)}}placeholder="harkirat@gmail.com" label={"Email"} />
                <InputBox onChange={e=>{setpassword(e.target.value)}}placeholder="123456" label={"Password"} />
                <div className="pt-4">
                    <Button onClick={async ()=>{
                        const response= await axios.post("http://localhost:3000/api/v1/user/signup",{
                            userName,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token",response.data.token)
                    }} label={"Signup"} />
                </div>
                <BottomWarning  label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>

    </div>
    
}