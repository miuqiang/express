const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const UsersController = require('../controllers/users');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/users')
  .get(UsersController.index)
  .post(validateBody(schemas.userSchema), UsersController.newUser);

//users:userId
router.route('/users/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUser)
  .put(UsersController.replaceUser)
  .patch(UsersController.updateUser)
  .delete(UsersController.deleteUser);

router.route('/users/:userId/cars')
  .get(UsersController.getUserCars)
  .post(UsersController.newUserCar);

module.exports = router;