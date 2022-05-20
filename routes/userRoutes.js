const express = require('express');
const { signup, login } = require('../controllers/authController');

const {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.route('/').get(getAllUsers);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
