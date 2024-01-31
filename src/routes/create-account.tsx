import { useState } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    
`;
const Form = styled.form``;

const Input = styled.input``;

export default function CreateAccount(){
    const[isLoading, setLoading] = useState(false);
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    return <Wrapper>
        <Form>
            <Input name="name" value ={name} placeholder="Name" type="text" required/>
            <Input name="email" value={email} placeholder="Email" type="eamil" required/>
            <Input name="password" value={password} placeholder="Password" type="passsword" required/>
            <Input name="submit" value="Create Account"/>
        </Form>
    </Wrapper>
}