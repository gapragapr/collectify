import User from "../db/models/User.js"

const checkRights = async (req, res, next) => {
    const admin = await User.findOne({_id: req.body.adminPresumedId})

    if (admin.role !== 'admin') {
        return res.status(403).json({
            message: "not enough rights"
        })
    }

    return next()
}

export default checkRights