import { Schema, model, models } from "mongoose";


const NoteSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },

    noteTitle:{
        type: String,
        required: [true, "Title is required"],
    },
    noteBody:{
        type: String,
        required: [true, "BodyText is required"],
    },
    bgColor: {
        type: String, 
        default: "bg-yellow-200",    
    },
    isShown: {
        type: Number, // Setting the type to Number
        default: 1,    // Setting the default value to 1
    },
    
})

const Note = models.Note || model("Note", NoteSchema);

export default Note;
