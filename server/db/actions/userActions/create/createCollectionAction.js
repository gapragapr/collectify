import User from "../../../models/User.js"
import Collection from "../../../models/Collection.js"

import generateImageUri from "../../../../functions/generateImageUri.js"

const createCollectionAction = async (collectionData, image, userId) => {
        try {
            const currentUser = await User.findOne({_id: userId})

            const collection = new Collection({...collectionData})
            
            if (image) {
                collection.collectionImg = await generateImageUri(image)
            } else {
                collection.collectionImg = process.env.IMAGE_STUB
            }

            currentUser.userCollections.push(collection)
            
            await currentUser.save()
            return currentUser
        } catch (error) {
            throw new Error(error)
        }
}

export default createCollectionAction