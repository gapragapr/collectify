import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const generateImageFromStr = (str) => {
    const base64WithoutPrefix = str.split(';base64,').pop(); 
    const contentType = str.split(':')[1].split(';')[0]; 
    const buffer = Buffer.from(base64WithoutPrefix, 'base64'); 
    const extension = contentType.split('/')[1];

    const file = new File([buffer], generateUniqueFilename(extension), { type: contentType });
    return file;
}

function generateUniqueFilename(extension) {
    const currentDate = new Date();
    const dateString = currentDate.toISOString().replace(/[:.]/g, '-');
    return `file_${dateString}.${extension}`;
}

const generateImageUri = async (imageStr) => {
    try {
        const clientId = process.env.IMGUR_CLIENT_ID
        const formData = new FormData()
        formData.append('image', generateImageFromStr(imageStr))

        const response = await axios.post('https://api.imgur.com/3/image', formData, {
            headers: {
                Authorization: `Client-ID ${clientId}`,
                'Content-Type': 'multipart/form-data',
            }
        })

        const uri = response.data.data.link
        return uri
    } catch (error) {
        console.log(error)
        return null
    }
}



export default generateImageUri