import mongoose from "mongoose";

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
    }]
})

const CollectionItem = mongoose.model('CollectionItem', collectionItemSchema)

export default CollectionItem