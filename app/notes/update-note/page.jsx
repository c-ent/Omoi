"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation'

import Form from "@components/Form"

const NoteDetails = ({ noteId, setNote }) => {
    useEffect(() => {
        const getNoteDetails = async () => {
            const response = await fetch(`/api/note/${noteId}`);
            const data = await response.json();
            setNote({
                title: data.noteTitle,
                body: data.noteBody,
                bgColor: data.bgColor
            });
        };
        if (noteId) getNoteDetails();
    }, [noteId, setNote]);

    return null;
};

const EditNoteContent = ({ noteId }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [note, setNote] = useState({ title: "", body: "", bgColor: '' });

    const updateNote = async (e) => {
        e.preventDefault(); 
        setSubmitting(true);
        if (!noteId) return alert("Note ID is missing");

        try {
            const response = await fetch(`/api/note/${noteId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    noteTitle: note.title,
                    noteBody: note.body,
                    bgColor: note.bgColor
                })
            });

            if (response.ok) {
                router.push('/notes');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <NoteDetails noteId={noteId} setNote={setNote} />
            <Form
                type='Update'
                note={note}
                setNote={setNote}
                submitting={submitting}
                handleSubmit={updateNote}
            />
        </>
    );
};

const EditNoteWrapper = () => {
    const searchParams = useSearchParams();
    const noteId = searchParams.get('id');

    if (!noteId) {
        return <div>Note ID is missing</div>;
    }

    return <EditNoteContent noteId={noteId} />;
}

const EditNote = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditNoteWrapper />
        </Suspense>
    );
}

export default EditNote;
