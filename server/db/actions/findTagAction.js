import Tag from "../models/Tag.js"

const findTag = async (tagName) => {
    try {
        const findedTag = await Tag.findOne({ tagName: tagName }); 
        if (!findedTag) {
            const createdTag = new Tag({tagName: tagName})
            await createdTag.save()
            return {...createdTag}
        }
        return {...findedTag}
    } catch (error) {
        throw new Error(error)
    }
}

export default findTag