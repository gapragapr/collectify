import User from "../../models/User.js"
import Collection from "../../models/Collection.js"

import createCollectionItemAction from "./createCollectionItemAction.js"

const createCollectionAction = async (collectionData) => {
        const currentUser = await User.findOne({_id: collectionData.collectionAuthor})

        const collection = new Collection({...collectionData, collectionItems: []})

        for (const item of collectionData.collectionItems) {
            const collectionItem = await createCollectionItemAction(item);
            collection.collectionItems.push(collectionItem);
        }

        currentUser.userCollections.push(collection)
        
        await currentUser.save()
}

export default createCollectionAction