import mongoose from "mongoose";

import getCurrentDate from "../../functions/getCurrentDate.js";
import getCurrentTime from "../../functions/getCurrentTime.js";

const commentSchema = new mongoose.Schema({
    commentAuthor: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    commentAuthorImg: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    commentedCollectionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    commentCreated: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            date: getCurrentDate(),
            time: getCurrentTime(),

        }
    }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment