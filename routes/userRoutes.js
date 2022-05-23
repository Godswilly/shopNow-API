const express = require('express');
const {
	signup,
	login,
	protectRoutes,
	roleAccess,
} = require('../controllers/authController');
const {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.route('/').get(protectRoutes, roleAccess('admin'), getAllUsers);

router
	.route('/:id')
	.get(protectRoutes, getUser)
	.patch(protectRoutes, updateUser)
	.delete(protectRoutes, deleteUser);

module.exports = router;
