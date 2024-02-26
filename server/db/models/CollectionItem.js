import mongoose from "mongoose";

const collectionItemSchema = new mongoose.Schema({
    collection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required: true
    },
    collectionItemName: {
        type: String,
        required: true,
        unique: true
    },
    collectionItemTags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    collectionItemCustomFileds: {
        type: [mongoose.Schema.Types.Mixed],
        required: false,
        default: null
    },

})

const CollectionItem = mongoose.model('CollectionItem', collectionItemSchema)

export default CollectionItem