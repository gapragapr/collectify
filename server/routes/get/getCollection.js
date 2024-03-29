import express from 'express'
import User from '../../db/models/User.js'

const router = express.Router()

router.get('/:username/:collectionId', async (req, res) => {
    const {username, collectionId} = req.params

    try {
        const user = await User.findOne({username: username})
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const collection = user.userCollections.find(collection => collection._id == collectionId)

        if (!collection) {
            return res.status(404).json({
                message: "Collection not found"
            })
        }

        return res.status(200).json({
            username: user.username,
            userCollection: collection
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})


export default router