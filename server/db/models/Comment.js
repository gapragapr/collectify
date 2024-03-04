import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentAuthor: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    commentedCollectionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment