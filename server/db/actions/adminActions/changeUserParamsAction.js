import User from "../../models/User.js";

const changeUserParamAction = async (userId, param, paramValue) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { [param]: paramValue },
            { new: true }
        );
        return true;
    } catch (error) {
        throw new Error(error);
    }
};

export default changeUserParamAction;
