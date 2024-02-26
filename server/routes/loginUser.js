import express from 'express'
import User from '../db/models/User.js'
import comparePassword from '../db/functions/comparePassword.js'

const router = express.Router()

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        const existingUser = await User.findOne({email})

        if (!existingUser) {
            return res.status(404).json({
                message: 'User not finded'
            })
        }

        const match = await comparePassword(password, existingUser.password);
        if (!match) {
            return res.status(403).json({ message: 'Invalid password' });
        }

        return res.status(200).json({
            message: 'User is logined'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Iternal server error'
        })
    }
})

export default router