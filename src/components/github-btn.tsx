import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import styled from "styled-components"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

const Button = styled.span`
    margin-top: 30px;
    background-color: white;
    font-weight: 500;
    width: 100%;
    color: black;
    padding : 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
const Logo = styled.img`
    height: 25px;

`
export default function GithubButton(){
    const navigate = useNavigate();
    const onClick = async() =>{
        try{
            const githubprovider = new GithubAuthProvider();
            await signInWithPopup(auth, githubprovider);
            
            navigate("/");
        } catch(error){
            console.log(error);
        }
    }

    /*const onClickGoogle = async() =>{
        try{
            const googleprovider = new GoogleAuthProvider();
            await signInWithPopup(auth, googleprovider);
            navigate("/");
        } catch(error){
            console.log(error);
        }
    }*/
    return (
        <Button onClick={onClick}>
            <Logo src="/github-logo.svg"/>
            Continue with Github
        </Button>
    );
}