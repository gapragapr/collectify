import express from 'express'

import createCollectionAction from '../../db/actions/userActions/createCollectionAction.js';

const router = express.Router()

router.post('/createCollection', async (req, res) => {
    const collectionData = req.body;

    try {
        await createCollectionAction(collectionData)

        return res.status(200).json({
            message: 'Collection created!'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }

})

export default router