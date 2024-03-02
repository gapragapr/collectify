import User from "../../../models/User.js";

const deleteCollectionItemAction = async (collectionAuthorId, collectionId, collectionItemId) => {
    try {
        const user = await User.findOne({_id: collectionAuthorId})
        const currentCollection = user.userCollections.find(collection => {
            return collection._id == collectionId
        })
        const currentColectionItem = currentCollection.collectionItems.findIndex(item => {
            return item._id == collectionItemId
        })

        currentCollection.collectionItems.splice(currentColectionItem, 1)
        
        user.markModified('userCollections')

        await user.save()


    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export default deleteCollectionItemAction