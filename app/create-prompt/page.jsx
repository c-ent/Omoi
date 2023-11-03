"use client"
import {useState} from 'react'
import { useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Form from "@components/Form"

const CreatePrompt = () => {
    const router = useRouter();
    const {data:session , status} = useSession();
    const [submitting, setSubmitting]  = useState(false) ;
    const [post, setPost] = useState({prompt: '',tag:'',})

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    const createPrompt = async (e) => {
        e.preventDefault(); // prevent default form submit reload
        setSubmitting(true);
        router.refresh();
        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt:post.prompt,
                    userId: session?.user.id,
                    tag:post.tag,
                    isShown: 1, // Set isShown to 1 to show the prompt
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
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
        )
}

export default CreatePrompt