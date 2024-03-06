import express from 'express'

import createCollectionAction from '../../../db/actions/userActions/create/createCollectionAction.js';

const router = express.Router()

router.post('/user/create/collection', async (req, res) => {
    const {collectionData, userInitiatorId} = req.body;

    try {
        await createCollectionAction(collectionData, userInitiatorId)

        return res.status(200).json({
            message: 'Collection created!'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }

})

export default router