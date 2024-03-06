import express from 'express'
import createCollectionItemAction from '../../../db/actions/userActions/create/createCollectionItemAction.js'
import User from '../../../db/models/User.js'

const router = express.Router()

router.post('/user/create/collectionItem', async (req, res) => {
    const {collectionAuthorId, collectionId, collectionItemData} = req.body

    try {
        const currentUser = await User.findOne({_id: collectionAuthorId})
        const currentCollection = currentUser.userCollections.find(collection => {
            return collection._id == collectionId
        })

        const newCollectionItem = await createCollectionItemAction(collectionItemData)

        currentCollection.collectionItems.push(newCollectionItem)

        currentUser.markModified('userCollections')

        await currentUser.save()

        return res.status(200).json({
            message: 'Collection item created'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }
})

export default router