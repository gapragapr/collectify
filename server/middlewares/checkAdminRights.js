import User from "../db/models/User.js"

const checkAdminRights = async (req, res, next) => {
    const {userInitiatorId} = req.body
    try {
        const admin = await User.findOne({_id: userInitiatorId})

        if (admin.role !== 'admin') {
            return res.status(403).json({
                message: "not enough rights"
            })
        }

        return next()
    } catch (error) {
        return res.status(500).json({
            message: 'Iternal server error'
        }) 
    }
}

export default checkAdminRights