import User from "../../models/User.js";

const deleteUserAction = async (userId) => {
    try {
        await User.findOneAndDelete({_id: userId})
        return true;
    } catch (error) {
        throw new Error(error);
    }
};

export default deleteUserAction;
