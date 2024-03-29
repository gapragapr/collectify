import express from 'express'
import User from '../db/models/User.js'
import hashPassword from '../functions/hashPassword.js'
import generateAvatarUri from '../functions/generateAvatarUri.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body

        const existingUserEmail = await User.findOne({email});
        if (existingUserEmail) {
            return res.status(400).json({ 
                type: 'email',
                message: 'User with this email already exists' });
        }

        const existingUserUsername = await User.findOne({username});
        if (existingUserUsername) {
            return res.status(400).json({ 
                type: 'username',
                message: 'User with this username already exists' });
        }

        const hashedPassword = await hashPassword(password)
        if (!hashedPassword) {
            return res.status(500).json({
                message: 'Internal server error: Error hashing password' 
            })
        } 

        const avatarUri = generateAvatarUri()

        const newUser = new User({ email, username, avatar: avatarUri, password: hashedPassword })

        await newUser.save()
        return res.status(200).json({
            ...newUser._doc,
            password: undefined
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error: ' + error 
        })
    }
})

export default router
