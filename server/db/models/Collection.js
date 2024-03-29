import mongoose from "mongoose";

import getCurrentTime from "../../functions/getCurrentTime.js";
import getCurrentDate from "../../functions/getCurrentDate.js";

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
    collectionCustomFields: {
        type: [mongoose.Schema.Types.Mixed],
        required: false
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
    collectionLikes: [{
        likeAuthor: {
            type: String
        }
    }],
    collectionCreated: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            date: getCurrentDate(),
            time: getCurrentTime(),

        }
    }
})

const Collection = mongoose.model('Collection', collectionSchema)

export default Collection