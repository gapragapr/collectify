import User from "../../models/User.js";

const likeCollectionAction = async (collectionId, username, userInitiatorId) => {
    try {
        const result = {};
        
        const currentUser = await User.findOne(
            { _id: userInitiatorId },
        );

        const currentCollection = await User.findOne(
            { username: username, userCollections: { $elemMatch: { _id: collectionId } } },
        );

        if (!currentCollection.userCollections.find(collection => collection._id == collectionId)) {
            result.status = 404;
            result.message = 'Collection not found';
            return result;
        }

        if (currentUser.userLikes.includes(collectionId)) {
            await User.findOneAndUpdate(
                { _id: userInitiatorId },
                { $pull: { userLikes: collectionId } }
            );
        
            await User.findOneAndUpdate(
                { username: username, userCollections: { $elemMatch: { _id: collectionId } } },
                { $pull: { 'userCollections.$.collectionLikes': { likeAuthor: userInitiatorId } } },
                { new: true }
            );
        
            result.status = 200;
            result.message = 'Like removed';
        } else {
            await User.findOneAndUpdate(
                { _id: userInitiatorId },
                { $addToSet: { userLikes: collectionId } },
                { new: true } 
            );
        
            await User.findOneAndUpdate(
                { username: username, userCollections: { $elemMatch: { _id: collectionId } } },
                { $addToSet: { 'userCollections.$.collectionLikes': { likeAuthor: userInitiatorId } } },
                { new: true }
            );
        
            result.status = 200;
            result.message = 'Liked';
        }
        

        return result;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export default likeCollectionAction;
