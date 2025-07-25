import React from 'react'
import { useState } from 'react'
import { Link,matchPath,Navigate,useNavigate } from 'react-router-dom'
import {login as authLogin} from "../store/authslice"
import {button,Input, Logo } from "../index"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from "../appwrite/auth"

function Login() {
    const nav=useNavigate();
    const dispatch= useDispatch();
     const {register, handleSubmit}=useState()
     const [error,setError]=useState("");
const login =async(data)=>
{
    
setError("")
try {
 const session= await authService.login(data)  
 if(session){
    const userData=await authService.getCurrentUser()
    if(userData){
        dispatch(authLogin(userData));
        Navigate("/")
    }
 }
} catch (error) {
    setError(error.message)
}



}
return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className='text-red-800'>{error} </p> }
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
        <Input label= "Ensil:"
        placeholder="email enter "
        type="email"
        {...register("email",{
            required:true,
            validate:{ 
 matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.
 test(value) ||
                        "Email address must be a valid address",            }
        
        })}
        >
        </Input>
<Input
label="Password:"
type="password"
placeholder="enter your password"
{...register( "password",{
    required :true,
} )}


/>
<Button type="submit" className="w-full">Sign In </Button>

            </div>
        </form>
        
        </div>
    </div>
);
}

export default Login;
