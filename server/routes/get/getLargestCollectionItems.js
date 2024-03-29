import express from 'express'
import User from '../../db/models/User.js'

const router = express.Router()

router.get('/shared/largest/collections', async (req, res) => {
    try {
        const largestCollections = await User.aggregate([
            { $unwind: "$userCollections" },
            { $project: { 
                collectionAuthorUsername: "$username", 
                userCollection: "$userCollections", 
                numberOfItems: { $size: "$userCollections.collectionItems" } 
            } },
            { $sort: { numberOfItems: -1 } },
            { $limit: 4 }
        ]);

        return res.status(200).json(largestCollections)
    } catch (error) {
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }
})

export default router