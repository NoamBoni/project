const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router
    .route('/')
    .delete(userController.deleteUser)
    .put(userController.updateUser);

router.put('/promote', userController.promoteUser);

module.exports = router;
