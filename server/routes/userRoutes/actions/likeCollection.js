import express from 'express'
import likeCollectionAction from '../../../db/actions/userActions/likeCollectionAction.js'

const router = express.Router()

router.post('/:username/:collectionId/like', async (req, res) => {
    const {username, collectionId} = req.params
    const {userInitiatorId} = req.body

    try {
        const likeResult = await likeCollectionAction(collectionId, username, userInitiatorId)

        return res.status(likeResult.status).json({
            message: likeResult.message
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }
})

export default router