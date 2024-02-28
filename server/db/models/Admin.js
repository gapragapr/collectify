import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
        default: 'admin'
    },
    status: {
        type: String,
        default: 'active'
    },
    userCollections: [{
        type: mongoose.Schema.Types.Mixed, 
        default: []
    }],
    userComments: [{
        type: mongoose.Schema.Types.Mixed,
        default: []
    }],
    userLikes: [{
        type: mongoose.Schema.Types.ObjectId,
        default: []
    }]
})

const Admin = mongoose.model('User', adminSchema)

export default Admin