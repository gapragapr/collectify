import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    collectionAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    collectionName: {
        type: String,
        required: true
    },
    collectionDescription: {
        type: String,
        required: true
    },
    collectionTopic: {
        type: String,
        required: true
    },
    collectionImg: {
        type: String,
        required: false,
        default: null
    },
    collectionItems: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'CollectionItem',
        required: true
    }],
    collectionComments: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'Comment',
        default: null
    }],
    collectionLikes: {
        type: Number,
        default: 0
    }
})

const Collection = mongoose.model('Collection', collectionSchema)

export default Collection