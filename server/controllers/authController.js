const User = require('../models/userModel');
const { sendRes } = require('../helpers/sendRes');

module.exports.signup = async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        const user = await User.create({ username, email, password, address });
        sendRes(res, user, 201);
    } catch (err) {
        sendRes(res, err, 400, true);
    }
};
