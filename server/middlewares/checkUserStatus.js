import User from "../db/models/User.js";

const checkUserStatus = async (req, res, next) => {
    const {userInitiatorId} = req.body

    try {
        const currentUser = await User.findOne({_id: userInitiatorId})

        if (!currentUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        if (currentUser.status === 'blocked'){
            return res.status(403).json({
                message: "User is blocked"
            })
        }

        next()
        
    } catch (error) {
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }
}

export default checkUserStatus