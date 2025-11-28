import { connectToDB } from '@utils/database';
import Note from "@models/notes";

export const GET = async (request, context) => {
    try {
        await connectToDB();
        const params = await context.params;
        const notes = await Note.find({
            creator: params.id
        }).populate("creator");

        return new Response(JSON.stringify(notes), { status: 200 });
    } catch (error) {
        return new Response("FAILED", { status: 500 });
    }
}