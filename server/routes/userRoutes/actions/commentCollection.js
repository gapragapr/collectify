import express from 'express'
import commentCollectionAction from '../../../db/actions/userActions/commentCollectionAction.js'

const router = express.Router()

router.post('/:username/:collectionId/comment', async (req, res) => {
    const {username, collectionId} = req.params
    const {userInitiatorId, commentData} = req.body

    try {
        const commentResult = await commentCollectionAction(collectionId, userInitiatorId, username, commentData)

        return res.status(commentResult.status).json({
            message: commentResult.message
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }
})

export default router