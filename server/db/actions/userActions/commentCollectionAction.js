import User from "../../models/User.js";
import Comment from "../../models/Comment.js";

const commentCollectionAction = async (collectionId, username, userInitiatorId, commentData) => {
    try {
        const currentUser = await User.findOne({_id: userInitiatorId})

        if (currentUser.userComments.find(comment => {return comment.commentedCollectionId == collectionId})) {
            return {
                status: 409,
                message: 'The user has already left a comment'
            }
        }

        const currentCollectionAuthor = await User.findOne({username: username})

        if (!currentCollectionAuthor) {
            return {
                status: 404,
                message: 'User not found'
            }
        }

        const currentCollection = currentCollectionAuthor.userCollections.find(collection => {
            return collection._id == collectionId
        })

        if (!currentCollection) {
            return {
                status: 404,
                message: 'Collection not found'
            }
        }

        const comment = new Comment({...commentData, commentedCollectionId: collectionId})

        currentUser.userComments.push(comment)
        currentCollection.collectionComments.push(comment.commentedCollectionId)

        currentUser.markModified('userComments')
        await currentUser.save()

        currentCollectionAuthor.markModified('userCollections')
        await currentCollectionAuthor.save()

        return {
            status: 200,
            message: 'Comment created'
        }

    } catch (error) {
        throw new Error(error)
    }
}

export default commentCollectionAction