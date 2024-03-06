import express from 'express'
import deleteCollectionItemAction from '../../../db/actions/userActions/delete/deleteCollectionItemAction.js'

const router = express.Router()

router.delete('/user/delete/collectionItem', async (req, res) => {
    const {collectionAuthorId, collectionId, collectionItemId} = req.body

    try {
        await deleteCollectionItemAction(collectionAuthorId, collectionId, collectionItemId)

        return res.status(200).json({
            message: "Collection item deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Iternal server error"
        })
    }
})

export default router