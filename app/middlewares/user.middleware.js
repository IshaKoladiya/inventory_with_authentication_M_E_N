const { check } = require('express-validator')

const validateuser = [
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('password', 'Password must contain atleast 6 characters, including Uppercase/Lowercase Alphabets, Numbers and symbols.')
    .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false })
    .exists(),
    check('email').trim().isEmail().withMessage('Invalid email address')
    
]
