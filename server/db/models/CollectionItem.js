import mongoose from "mongoose";

import getCurrentDate from "../../functions/getCurrentDate.js";
import getCurrentTime from "../../functions/getCurrentTime.js";

const collectionItemSchema = new mongoose.Schema({
    collectionItemName: {
        type: String,
        required: true,
        unique: true
    },
    collectionItemTags: [{
        type: mongoose.Schema.Types.Mixed,
        required: true,
        ref: 'Tag'
    }],
    collectionItemCustomFields: [{
        type: mongoose.Schema.Types.Mixed,
        required: false
    }],
    collectionItemCreated: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            date: getCurrentDate(),
            time: getCurrentTime(),

        }
    }
})

const CollectionItem = mongoose.model('CollectionItem', collectionItemSchema)

export default CollectionItem