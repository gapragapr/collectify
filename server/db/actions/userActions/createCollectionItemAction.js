import CollectionItem from "../../models/CollectionItem.js"
import findTag from "../findTagAction.js"

const createCollectionItemAction = async (collectionItemData) => {
    const collectionItem = {...collectionItemData, collectionItemTags: []}
    
    const tagPromise = collectionItemData.collectionItemTags.map(async tag => {
        const itemTag = await findTag(tag.tagName)

        if (itemTag){
            collectionItem.collectionItemTags.push(itemTag)
        }
        
    })

    await Promise.all(tagPromise)
    
    return new CollectionItem(collectionItem)
}

export default createCollectionItemAction