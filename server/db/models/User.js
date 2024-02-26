import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true            
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: String,
        default: 'active'
    },
    rights: {
        type: [String],
        default: [
            'create_collection',
            'edit_collection',
            'view_collection',
            'comment_collection',
            'like_collection',
            'view_role',
            'view_status'
        ]
    },
    userCollections: {
        type: [mongoose.Schema.Types.ObjectId], 
        default: []
    },
    userComments: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    userLikes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
})

const User = mongoose.model('User', userSchema)

export default User