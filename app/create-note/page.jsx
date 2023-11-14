"use client"
import {useState} from 'react'
import { useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Form from "@components/Form"

const CreateNote = () => {
    const router = useRouter();
    const {data:session , status} = useSession();
    const [submitting, setSubmitting]  = useState(false) ;
    const [note, setNote] = useState({title: '',body:'', bgColor:''})

    if (status === "loading") {     
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    const storeNote = async (e) => {
        e.preventDefault(); // prevent default form submit reload
        setSubmitting(true);
        router.refresh();
        try {
            const response = await fetch("/api/note/new", {
                method: "POST",
                body: JSON.stringify({
                    userId: session?.user.id,
                    noteTitle:note.title,
                    noteBody:note.body,
                    bgColor:note.bgColor,
                    isShown: 1, // Set isShown to 1 to show the note
                })
            })
            if(response.ok){
                router.push('/');
            }
        } catch(error){
            console.log(response)
            console.log(error)
        } finally {
            setSubmitting(false);
        }

    }
        return (
         
            <Form 
            type="Create"
            note={note}
            setNote={setNote}
            submitting={submitting}
            handleSubmit={storeNote}
        />
    
        )
}

export default CreateNote