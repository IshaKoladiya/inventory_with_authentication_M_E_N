const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

function sendSuccessResponse(res, message, data) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }
  
  function sendErrorResponse(res, status, message) {
    return res.status(status).json({
      success: false,
      message,
    });
  }
  

// Function to hash a password
async function hashPassword(password) {
  const saltRounds = 10; // The number of salt rounds determines the complexity of the hash

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('hash>>>>>>>>>>>>>>>>',hash)
    return hash;
  } catch (error) {
    throw error;
  }
}

// Function to compare a plain text password with a hashed password
async function comparePasswords(plainTextPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
}

async function generateToken(user) {
  const payload = {
    user: {
      id: user.id,
      role: user.role
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12hr' });
}

// verifyToken

async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    // find user detils by id
    const user = await User.findById(decoded.user.id);

    return user.role === 'admin'

    return decoded.user;
  } catch (error) {
    throw error;
  }
}



  module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
    hashPassword,
    comparePasswords,
    generateToken,
    verifyToken
  };

