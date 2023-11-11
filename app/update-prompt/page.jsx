"use client"

import { useEffect, useState} from 'react'
import { useSession} from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation'

import Form from "@components/Form"

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const {data:session } = useSession();
    const [submitting, setSubmitting]  = useState(false) ;
    const [post, setPost] = useState({ prompt: "", tag: "", bgColor:''});

    useEffect(() => {
        const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
    
        setPost({prompt: data.prompt,tag: data.tag,bgColor: data.bgColor});
        };
    
        if (promptId) getPromptDetails();
    },[promptId]);




    const updatePrompt = async (e) => {
        e.preventDefault(); // prevent default form submit reload
        setSubmitting(true);

        if(!promptId) return alert("Prompt ID is missing");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag,
                    bgColor:post.bgColor
                })
            })

            if(response.ok){
                router.push('/');
            }
        } catch(error){
            console.log(error)
        } finally {
            setSubmitting(false);
        }

    }
    return (
        <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt