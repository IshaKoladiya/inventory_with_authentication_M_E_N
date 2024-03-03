
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');

// Create a new user
router.post(
  '/users/register',
  [
    // Express Validator middleware for validation
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    await userController.createUser(req, res);
  }
);

router.post(
  '/users/login',
  [
    // Express Validator middleware for validation
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    await userController.loginUser(req, res);
  }
);

router.post(
  '/category',
  [
    // Express Validator middleware for validation
    body('category_name').trim().notEmpty().withMessage('category Name is required'),

  ],
  async (req, res) => {
    await productController.createCategory(req, res);
  }
  
)

router.put(
  '/category/:id',
  [
    // Express Validator middleware for validation
    body('category_name').trim().notEmpty().withMessage('category Name is required')
  ], 
  async (req, res) => {
    await productController.updateCategory(req, res);
  }   

)

router.post(
  '/product',
  [
    // Express Validator middleware for validation
    body('product_name').trim().notEmpty().withMessage('Product Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').trim().isNumeric().withMessage('Invalid price'),
    body('category').trim().notEmpty().withMessage('Invalid category'),
    body('image').trim().notEmpty().withMessage('Invalid Image'),
    body('stock').trim().isNumeric().withMessage('Invalid stock'),
    body('status').trim().notEmpty().withMessage('Invalid status'),
  ],
  async (req, res) => {
    await productController.createProduct(req, res);
  }
  
)

router.get(
  '/product',
  async (req, res) => {
    await productController.getProduct(req, res);
  }
)

router.get(
  '/product/:id',
  async (req, res) => {
    await productController.getProductById(req, res);
  }
)

router.put(
  '/product/:id',
  [
    // Express Validator middleware for validation
    body('product_name').trim().notEmpty().withMessage('Product Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').trim().isNumeric().withMessage('Invalid price'),
    body('category').trim().notEmpty().withMessage('Invalid category'),
    body('image').trim().notEmpty().withMessage('Invalid Image'),
    body('stock').trim().isNumeric().withMessage('Invalid stock'),
    body('status').trim().notEmpty().withMessage('Invalid status'),
  ],
  async (req, res) => {
    await productController.updateProduct(req, res);
  }
)

router.delete(
  '/product/:id',
  async (req, res) => {
    await productController.deleteProduct(req, res);
  }
)

router.get('/categorywise/product/list',
  async (req, res) => {
    await productController.getcategorywiseproductlist(req, res);
  }
)


module.exports = router;
