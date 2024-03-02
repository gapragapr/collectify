import User from "../../../models/User.js";

const deleteCollectionAction = async (collectionAuthorId, collectionId) => {
    try {
        const user = await User.findOne({_id: collectionAuthorId})
        const currentCollection = user.userCollections.find(collection => {
            return collection._id == collectionId
        })

        user.userCollections.splice(currentCollection, 1)

        await user.save()

    } catch (error) {
        throw new Error(error)
    }
}

export default deleteCollectionAction