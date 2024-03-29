import express from 'express'
import User from '../../db/models/User.js'

const router = express.Router()

router.get('/:username', async (req, res) => {
    const {username} = req.params

    try {
        const user = await User.findOne({username: username})

        if (!user) {
            return res.status(404).json({
                message: "User not founded"
            })
        }

        return res.status(200).json({
            ...user._doc,
            password: undefined
    })
    } catch (error) {
        return res.status(500).json({
            message: "Iternal server error"
        })
    }
})

export default router