const utl_func = require('../utils/functions/utilfunction')
const ut_const= require('../utils/constant')
const User = require('../models/user');
const bcrypt = require('bcrypt');

function createUser(username, email, password,role) {
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        let err_obj =  new Error('User with this email already exists.')
        reject(err_obj);
       
      }
      password = await utl_func.hashPassword(password);
      const newUser = new User({ username, email, password,role });
      await newUser.save();

      resolve(newUser);
    } catch (error) {
      reject(error);
    }
  });
}

function loginUser(email, password){
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        let err_obj =  new Error('User with this email does not exist.')
        reject(err_obj);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        let err_obj =  new Error('Invalid password.')
        reject(err_obj);
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  createUser,
  loginUser,
};

