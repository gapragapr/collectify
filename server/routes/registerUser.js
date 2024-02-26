import express from 'express'
import User from '../db/models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const {email, username, password} = req.body

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        const newUser = new User({email, username, password})

        await newUser.save()
        return res.status(200).json({
            message: 'User registered'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Iternal server error: ' + error 
        })
    }
})

export default router