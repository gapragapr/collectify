import User from "../../models/User.js";

const changeRoleAction = async (userId, newRole) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { role: newRole },
            { new: true }
        );
        return true;
    } catch (error) {
        throw new Error(error);
    }
};

export default changeRoleAction;
