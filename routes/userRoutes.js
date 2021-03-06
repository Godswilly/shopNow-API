const express = require('express');
const {
	signup,
	login,
	protectRoutes,
	roleAccess,
	forgotPassword,
	resetPassword,
	updatePassword,
} = require('../controllers/authController');
const {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	updateMe,
	deleteMe,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

router.patch('/updateMyPassword', protectRoutes, updatePassword);
router.patch('/updateMe', protectRoutes, updateMe);
router.delete('/deleteMe', protectRoutes, deleteMe);

router.route('/').get(protectRoutes, roleAccess('admin'), getAllUsers);

router
	.route('/:id')
	.get(protectRoutes, getUser)
	.patch(protectRoutes, updateUser)
	.delete(protectRoutes, deleteUser);

module.exports = router;
