import User from "../../../models/User.js"
import Collection from "../../../models/Collection.js"

import createCollectionItemAction from "./createCollectionItemAction.js"

const createCollectionAction = async (collectionData, userId) => {
        try {
            const currentUser = await User.findOne({_id: userId})

            const collection = new Collection({...collectionData, collectionItems: []})

            for (const item of collectionData.collectionItems) {
                const collectionItem = await createCollectionItemAction(item);
                collection.collectionItems.push(collectionItem);
            }

            currentUser.userCollections.push(collection)
            
            await currentUser.save()
        } catch (error) {
            console.log(error)
        }
}

export default createCollectionAction