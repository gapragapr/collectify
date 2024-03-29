import express from 'express'
import Tag from '../../db/models/Tag.js'

const router = express.Router()

router.get('/shared/random/tags', async (req, res) => {
    try {
        const randomTags = await Tag.aggregate([
            { $sample: { size: 15 } }
          ]);
          
        return res.status(200).json(randomTags)
    } catch (error) {
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }
})

export default router