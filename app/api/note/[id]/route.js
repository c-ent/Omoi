import { connectToDB } from '@utils/database';
import Note from "@models/notes";


//GET (read)
export const GET = async (request, {params}) => {
    try{
        await connectToDB();
        const note = await Note.findById(params.id).populate("creator");
        if(!note) return new Response("Note not found", {status: 404})
        return new Response(JSON.stringify(note), {status: 200})
    } catch(error){
        return new Response("FAILED", {status:500})
    }
}
//PATCH (update)
export const PATCH = async (request, { params }) => {
    const { noteTitle,noteBody,bgColor,isShown } = await request.json();
    try {
        await connectToDB();
        const existingNote = await Note.findById(params.id);

        if (!existingNote) {  // Check for the existence of the existing Note, not the request payload property
            return new Response("Note not found", { status: 404 });
        }
        existingNote.noteTitle = noteTitle;
        existingNote.noteBody = noteBody;
        existingNote.bgColor = bgColor;
        existingNote.isShown = isShown;
        await existingNote.save();

        return new Response(JSON.stringify(existingNote), { status: 200 });
    } catch (error) {
        console.log(error);
    }
}


//DELETE (delete)
export const DELETE = async (request, {params}) => {
    try{
        await connectToDB();

        await Note.findByIdAndRemove(params.id);

        return new Response("Note delete", {status:200})

    }catch(error){
        return new Response("Failed top delete ", {status:500})
    }
}