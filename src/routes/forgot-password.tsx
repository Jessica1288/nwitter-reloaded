import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-component";

export default function ResetAccount(){
    const navigator = useNavigate();
    const[isLoading, setLoading] = useState(false);
    const[email, setEmail] = useState("");
    const[error, setError] = useState("");
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {target : {name, value}} = e;
        if(name === "email"){
            setEmail(value);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try{
            if(isLoading || email === "") return;
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
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
        <Title>Reset Password</Title>
        <Form onSubmit={onSubmit}>
            <Input name="email" onChange={onChange} value={email} placeholder="Email" type="eamil" required/>
            <Input type="submit" value={isLoading ? "Loading..." : "Reset"}/>
        </Form>
        {error !== "" ? <Error>{error} </Error> : null }
        <Switcher>
            Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
        </Switcher>
        <Switcher>
            Already have an account? <Link to="/login">Log in &rarr;</Link>
        </Switcher>
    </Wrapper>
}