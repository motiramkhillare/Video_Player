import mongoose, {Schema} from "mongoose";
import paginate from 'mongoose-paginate-v2';

const videoSchema = new Schema(
{
    videoFile: {
        type: String, //cloudinary url
        required: true,
    },
    thumbnil: {
        type: String, //cloudinary url
    },title: {
        type: String, //url
    },
    description:{
        type: String,
        required: true,
    },
    duration:{
        type: Number, 
        required: true,
    },
    views:{
        type:Number,
        default: 0,
    },
    isPublished:{
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    } 
},
{timestamps: true});

videoSchema.plugin(paginate) 

export const Video = mongoose.model("Video","videoSchema")