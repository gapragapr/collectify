import crypto from 'crypto'

const generateAvatarUri = () => {
    const randomNumber = crypto.randomInt(0, 1e8)
    return `https://api.multiavatar.com/${randomNumber}`
}

export default generateAvatarUri