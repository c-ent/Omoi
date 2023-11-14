import { connectToDB } from '@utils/database';
import Note from "@models/notes";


export const POST = async (req) => {
    const { userId, noteTitle, noteBody , bgColor } = await req.json();
    try{
        await connectToDB();
        const newNote = new Note({
            creator:userId, 
            noteTitle,
            noteBody,
            bgColor
        })
        await newNote.save();
        return new Response(JSON.stringify(newNote), {status: 201,})
    } catch(error) {
        // console.log(error)
        return(error)
        
    }
}