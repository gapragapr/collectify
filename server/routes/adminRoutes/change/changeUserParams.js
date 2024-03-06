import express from 'express'
import changeUserParamsAction from '../../../db/actions/adminActions/changeUserParamsAction.js'

const router = express.Router()

router.post('/admin/change/userParam/:userId', async (req, res) => {
    const {userId} = req.params

    try {
        await changeUserParamsAction(userId, req.body.param, req.body.paramValue)

        return res.status(200).json({
            message: "User params changed"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Iternal server error"
        })
    }
})

export default router