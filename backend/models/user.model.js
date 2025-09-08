import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    assistantName: {
        type: String,
        default: "AI Assistant"
    },
    assistantImage:{
        type: String,
        default: "https://example.com/default-assistant-image.png"
    },
    hisytory: [
        {type: String}
    ]
}, { timestamps: true});


export const User = mongoose.model("User", userSchema);