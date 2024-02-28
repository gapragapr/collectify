import express from 'express'
import changeRoleAction from '../../db/actions/adminActions/changeRoleAction.js'

const router = express.Router()

router.post('/changeRole/:userId', async (req, res) => {
    const {userId} = req.params
    try {
        await changeRoleAction(userId, req.body.newRole)
        return res.status(200).json({
            message: 'User`s role changed'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Iternal server error'
        })
    }
})

export default router