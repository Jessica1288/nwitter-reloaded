import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components"
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Error } from "./auth-component";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width:  100%;
    resize: none; 
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &::placeholder{
        font-size: 16px;
    }
    &:focus{
        outline: none;
        border-color: #24a5d8;
    }
`;
const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: #24a5d8;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #24a5d8;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;
const AttachFileInput = styled.input`
    display: none;
`;
const SubmitBtn = styled.input`
    background-color: #24a5d8;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active{
        opacity: 0.8;
    }
`;

export default function PostTweetForm(){
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File|null>(null);
    const [fileError, setFileError] = useState("");
    const maxFileSize = 1024 ** 2;
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setTweet(e.target.value);
    };
    const onFilechange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {files} = e.target; 
        if(files && files.length === 1){
            if(files[0].size < maxFileSize){
                setFile(files[0]);
                setFileError("");
            }
            else{
                setFileError("File size is too large. Please upload file below 1MB");
            }   
        }
        
    };
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const user = auth.currentUser;
        if(!user || isLoading || tweet === "" || tweet.length > 180) return;
        try{
            setLoading(true);
            const doc = await addDoc(collection(db, "tweets"), {
                tweet,
                createdAt: Date.now(),
                username : user.displayName || "Anonymous",
                userId : user.uid,
            });
            if(file){
                const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`); 
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url,
                });
            }
            setTweet("");
            setFile(null);
        } catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    };
    return(
        <Form onSubmit={onSubmit}>
            <TextArea required rows={5} maxLength={180} onChange={onChange} value={tweet} placeholder="What is happening?"/>
            <AttachFileButton htmlFor="file">{file ? "Photo added ✅" : "Add Photo"}</AttachFileButton>
            <AttachFileInput onChange={onFilechange} type="file" id="file" accept="image/*"/>
            {fileError !== "" ? <Error>{fileError}</Error> : null}
            <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"}/>
        </Form>
    );
    
}