import express from 'express'
import deleteCollectionAction from '../../../db/actions/userActions/delete/deleteCollectionAction.js'

const router = express.Router()

router.delete('/user/delete/collection', async (req, res) => {
    const {collectionId, collectionAuthorId} = req.body

    try {
        await deleteCollectionAction(collectionAuthorId, collectionId)
        return res.status(200).json({
            message: "Collection deleted"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Iternal server error"
        })
    }
})

export default router