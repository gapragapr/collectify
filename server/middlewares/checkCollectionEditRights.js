import User from "../db/models/User.js";

const checkCollectionEditRights = async (req, res, next) => {
    const {collectionId, collectionAuthorId, userInitiatorId} = req.body

    try {
        const userInitiator = await User.findOne({_id: userInitiatorId})

        if (userInitiator.role === 'admin') {
            return next()
        }

        const user = await User.findOne({_id: collectionAuthorId})
        const currentCollection = user.userCollections.find(collection => {
            return collection._id == collectionId
        })

        if (currentCollection.collectionAuthor == userInitiatorId) {
            return next ()
        }

        return res.status(403).json({
            message: "Not enough rights"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Iternal server error'
        })
    }
}

export default checkCollectionEditRights