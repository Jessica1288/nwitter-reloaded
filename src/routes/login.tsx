import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-component";
import GithubButton from "../components/github-btn";


export default function CreateAccount(){
    const navigator = useNavigate();
    const[isLoading, setLoading] = useState(false);
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {target : {name, value}} = e;
        if(name === "email"){
            setEmail(value);
        }
        else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try{
            if(isLoading || email === "" || password === "") return;
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigator("/");
        }catch(e){
            if(e instanceof FirebaseError)
                setError(e.message);
        }
        finally{
            setLoading(false);
        }
    };

    return <Wrapper>
        <Title>Log into 𝕏</Title>
        <Form onSubmit={onSubmit}>
            <Input name="email" onChange={onChange} value={email} placeholder="Email" type="eamil" required/>
            <Input name="password" onChange={onChange} value={password} placeholder="Password" type="password" required/>
            <Input type="submit" value={isLoading ? "Loading..." : "Log in"}/>
        </Form>
        {error !== "" ? <Error>{error} </Error> : null }
        <Switcher>
            Don't have an account?{" "} <Link to="/create-account">Create one &rarr;</Link>
        </Switcher>
        <GithubButton/>
    </Wrapper>
}