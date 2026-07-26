import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true, // Serach Onptimization
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true,'Password is required']
    },
    refreshToken: {
        type: String
    }
},
    {
        timestamps: true
    }
);

userSchema.pre("save", async function(next) {
    this.password = bcrypt.hash(this.password, 10)
}
)  

export const User = mongoose.model("User","userSchema")