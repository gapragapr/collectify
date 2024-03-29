import User from "../../models/User.js";
import Comment from "../../models/Comment.js";

const commentCollectionAction = async (collectionId, userInitiatorId, username, commentData) => {
    try {
        let currentUser = await User.findOne({_id: userInitiatorId})

        if (currentUser.userComments.find(comment => {return comment.commentedCollectionId == collectionId})) {
            return {
                status: 409,
                message: 'The user has already left a comment'
            }
        }

        let currentCollectionAuthor = await User.findOne({username: username})

        if (!currentCollectionAuthor) {
            return {
                status: 404,
                message: 'User not found'
            }
        }

        const currentCollectionIndex = currentCollectionAuthor.userCollections.findIndex(collection => {
            return collection._id == collectionId
        })

        if (currentCollectionIndex == -1) {
            return {
                status: 404,
                message: 'Collection not found'
            }
        }

        const comment = new Comment({...commentData, commentAuthorImg: currentUser.avatar, commentedCollectionId: collectionId})


        currentUser = await User.findOne({_id: userInitiatorId})
        currentUser.userComments.push(comment)
        currentUser.markModified('userComments')
        await currentUser.save()
        
        currentCollectionAuthor = await User.findOne({username: username})
        currentCollectionAuthor.userCollections[currentCollectionIndex].collectionComments.push(comment)
        currentCollectionAuthor.markModified(`userCollections.${currentCollectionIndex}.collectionComments`)
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