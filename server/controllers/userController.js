const User = require('../models/userModel');
const { sendRes } = require('../helpers/sendRes');

module.exports.deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        await User.findByIdAndDelete(id);
        sendRes(res, 'deleted successfully', 200);
    } catch (err) {
        sendRes(res, err, 400, true);
    }
};

module.exports.promoteUser = async (req, res) => {
    const { id, role } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { role },
            {
                new: true,
                runValidators: true,
            }
        );
        sendRes(res, user, 200);
    } catch (err) {
        sendRes(res, err, 400, true);
    }
};

module.exports.updateUser = async (req, res) => {
    const { id, username, email, address } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { username, email, address },
            {
                new: true,
                runValidators: true,
            }
        );
        sendRes(res, user, 200);
    } catch (err) {
        sendRes(res, err, 400, true);
    }
};
