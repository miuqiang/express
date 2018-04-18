const User = require('../models/users');
const Car = require('../models/car');

//  * We can interact with mongose in 3 different ways
//  * 1) Callbacks
//  * 2) Promises
//  * 3) Async/Await (Promises)

module.exports = {
/**
 * 1）callback
 */
  // index: (req, res, next) => {
  //   User.find({}, (err, users) => {
  //     if (err) {
  //       next(err);
  //     }

  //     res.status(200).json(users);
  //   })
  // },
  // newUser: (req, res, next) => {
  //   const newUser = new User(req.body);
  //   newUser.save((err, user) => {
  //     if (err) {
  //       next(err);
  //     }
  //     res.status(201).json(user);
  //   });
  // },

/**
 * 2）Promise
 */
//   index: (req, res, next) => {
//     User.find({})
//       .then(users => {
//         //Do something with users here...
//         res.status(200).json(users);
//       })
//       .catch(err => {
//         next(err);
//       })
//   },
//   newUser: (req, res,next) => {
//     const newUser = new User(req.body);
//     newUser.save()
//       .then(user => {
//         res.status(201).json(user);
//       })
//       .catch(err => {
//         next(err);
//       })
//   }
/**
 * 3) Async/Await (Promises)
 */
  index: async (req, res ,next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    }catch (err) {
      next(err);
    }
  },

  newUser: async (req, res, next) => {
      const newUser = new User(req.value.body);
      const user = await newUser.save();
      res.status(201).json(user);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    // enforce that req.body must contain all the fields
    const { userId } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userId, newUser)
    res.status(200).json({success: true});
  },

  updateUser: async  (req, res, next) => {
    // req.body may contain any number of fields
    const { userId } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userId, newUser)
    res.status(200).json({success: true});
  },

  deleteUser: async (req, res, next) => {
    const { userId } = req.params;
    const result = await User.findByIdAndRemove(userId);
    res.status(200).json({success: true});
  },

  getUserCars: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('cars');
    res.status(201).json(user.cars);
  },

  newUserCar: async (req, res, next) => {
    const { userId } = req.params;
    //Create a new car
    const newCar = new Car(req.body);
    //Get user
    const user = await User.findById(userId);
    //Assign user as car`s seller
    newCar.seller = user;
    //Save the car
    await newCar.save();
    //Add car to the user`s selling array 'cars'
    // console.log('typeof newCar', typeof newCar);
    // console.log('typeof newCar.toObject', typeof (newCar.toObject()));
    user.cars.push(newCar.toObject());
    //Save the user
    await user.save();
    res.status(200).json(newCar);
  }
}