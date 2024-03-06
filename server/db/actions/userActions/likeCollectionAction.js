import User from "../../models/User.js";

const likeCollectionAction = async (collectionId, username, userInitiatorId) => {
    try {
        const currentUser = await User.findOne({ _id: userInitiatorId });
        const currentCollectionAuthor = await User.findOne({ username: username });

        const result = {}

        if (!currentCollectionAuthor) {
            result.status = 400
            result.message = 'User not found'
            return result
        }

        const currentCollection = currentCollectionAuthor.userCollections.find(collection => collection._id == collectionId);

        if (!currentCollection) {
            result.status = 404
            result.message = 'Collection not found'
            return result
        }

        if (currentUser.userLikes.includes(collectionId)) {
            currentCollection.collectionLikes -= 1;
            currentUser.userLikes = currentUser.userLikes.filter(id => id != collectionId);

            result.status = 200
            result.message = 'Like removed'
        } else {
            currentCollection.collectionLikes += 1;
            currentUser.userLikes.push(collectionId);

            result.status = 200
            result.message = 'Liked'
        }

        await currentUser.save();

        currentCollectionAuthor.markModified('userCollections')
        await currentCollectionAuthor.save();

        return result

    } catch (error) {
        throw new Error(error);
    }
}

export default likeCollectionAction;
