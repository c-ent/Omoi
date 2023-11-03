import { Schema, model, models } from "mongoose";


const PromptSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },

    prompt:{
        type: String,
        required: [true, "Prompt is required"],
    },
    tag:{
        type: String,
        required: [true, "Tag is required"],
    },
    isShown: {
        type: Number, // Setting the type to Number
        default: 1,    // Setting the default value to 1
    },
    
})


const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
