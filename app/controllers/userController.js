
const { validationResult } = require('express-validator');
const userService = require('../services/userService');
const utl_func = require('../utils/functions/utilfunction');
const ut_const= require('../utils/constant');

function createUser(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate input using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return utl_func.sendErrorResponse(res, 400, errors.array());
        }
  
        const { username, email, password,role } = req.body;
        const newUser = await userService.createUser(username, email, password,role);
  
        return utl_func.sendSuccessResponse(res, 'User created successfully', newUser);
      } catch (error) {
        console.error(error);
        return utl_func.sendErrorResponse(res, 500, error.message);
      }
    })
    .catch((error) => {
      // Handle unhandled promise rejection here
      console.error('Unhandled Promise Rejection:', error);
      return utl_func.sendErrorResponse(error, 500, 'Internal Server Error');
    });
  }


  function loginUser(req,res) {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate input using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return utl_func.sendErrorResponse(res, 400, errors.array());
        }
  
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);

        // send token in response 
        const token = await utl_func.generateToken(user);
        
        
        return utl_func.sendSuccessResponse(res, 'User logged in successfully', {user,token});
  
      } catch (error) {
        console.error(error);
        return utl_func.sendErrorResponse(res, 500, error.message);
      }
    })
    .catch((error) => {
      // Handle unhandled promise rejection here
      console.error('Unhandled Promise Rejection:', error);
      return utl_func.sendErrorResponse(error, 500, 'Internal Server Error');
    });
  }
  
module.exports = {
  createUser,
  loginUser,
};
