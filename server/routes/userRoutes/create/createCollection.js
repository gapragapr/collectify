import express from 'express'

import createCollectionAction from '../../../db/actions/userActions/create/createCollectionAction.js';

const router = express.Router()

router.post('/user/create/collection', async (req, res) => {
    const {collectionData, collectionImage, userInitiatorId} = req.body;

    try {
        const user = await createCollectionAction(collectionData, collectionImage, userInitiatorId)

        return res.status(200).json({
            ...user._doc.userCollections,
            password: undefined
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }

})

export default router