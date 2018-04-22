const Car = require('../models/car');
const User = require('../models/users');


module.exports = {
  index: async (req, res ,next) => {
    //Get all the cars.
    const cars = await Car.find({});
    console.log(cars);
    res.status(200).json(cars);
  },

  newCar: async (req, res, next) => {
    // 1. Find the actual seller
    const seller = await User.findById(req.body.seller);

    // 2.Create a new car
    const newCar = req.body;
    delete newCar.seller;

    const car = new Car(newCar);
    car.seller = seller;
    await car.save();
    
    // 3.Add newly created car to the actual seller
    seller.cars.push(car);
    await seller.save();

    //We`re donel
    res.status(200).json(car);
  },

  getCar: async (req, res, next) => {
    const car = await Car.findById(req.params.carId);
    res.status(200).json(car);
  },

  replaceCar: async (req, res, next) => {
    const { carId } = req.params;
    const newCar = req.body;
    const result = await  Car.findByIdAndUpdate(carId, newCar);
    
    res.status(200).json({success:true});
  },

  deleteCar: async (req, res, next) => {
    const { carId } = req.params;
    const car = await Car.findById(carId);

    if(!car) {
      return res.status(404).json({error: 'Not found!'});
    }

    const sellerId = car.seller;

    const seller = await User.findById(sellerId);
    
    await car.remove();
    
    seller.cars.pull(car);
    
    await seller.save();
    res.status(200).json({success: true});

  }
}