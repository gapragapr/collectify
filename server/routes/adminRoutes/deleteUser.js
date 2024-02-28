import express from 'express'
import User from '../../db/models/User.js'

const router = express.Router()

router.delete('/deleteUser/:userId', async (req, res) => {
    const userId = req.params.userId    

    try {
        await User.findOneAndDelete(userId)

        return res.status(200).json({
            message: 'User deleted'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }
})

export default router