const router = require('express-promise-router')();

const CarsController = require('../controllers/cars');

const {
  validateBody,
  validateParam,
  schemas
} = require('../helpers/routeHelpers');

router.route('/cars')
  .get(CarsController.index)
  .post(CarsController.newCar);

router.route('/cars/:carId')
  .get(CarsController.getCar)
  .put(CarsController.replaceCar)
  .delete(CarsController.deleteCar);

module.exports = router;