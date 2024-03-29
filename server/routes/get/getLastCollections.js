import express from 'express'
import User from '../../db/models/User.js'

const router = express.Router()

router.get('/shared/last/collections', async (req, res) => {
    try {
        const latestCollections = await User.aggregate([
            { $unwind: '$userCollections' }, 
            { $sort: { 'userCollections.collectionCreated.date': -1, 'userCollections.collectionCreated.time': -1 } },
            { $limit: 4 },
            {
              $project: { 
                collectionAuthorUsername: '$username',
                userCollection: '$userCollections' 
              }
            }
          ]);
          
        return res.status(200).json(latestCollections)
    } catch (error) {
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }
})

export default router