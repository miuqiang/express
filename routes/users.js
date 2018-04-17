const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const UsersController = require('../controllers/users');

router.route('/users')
  .get(UsersController.index)
  .post(UsersController.newUser);

//users:userId
router.route('/users/:userId')
  .get(UsersController.getUser)
  .put(UsersController.replaceUser)
  .patch(UsersController.updateUser)
  .delete(UsersController.deleteUser);

router.route('/users/:userId/cars')
  .get(UsersController.getUserCars)
  .post(UsersController.newUserCar);

module.exports = router;