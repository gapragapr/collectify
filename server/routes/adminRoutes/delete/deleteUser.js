import express from 'express'
import deleteUser from '../../../db/actions/adminActions/deleteUserAction.js'

const router = express.Router()

router.delete('/admin/delete/user/:userId', async (req, res) => {
    const userId = req.params.userId    

    try {
        const userIsDelete = await deleteUser(userId)

        if (userIsDelete) {
            return res.status(200).json({
                message: 'User deleted'
            })
        } else {
            return res.status(404).json({
                message: "User not found"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }
})

export default router