const { validationResult } = require('express-validator');
const productService = require('../services/productService');
const utl_func = require('../utils/functions/utilfunction');
const ut_const= require('../utils/constant');

function createProduct(req,res) {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate input using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return utl_func.sendErrorResponse(res, 400, errors.array());
      }
      

      const { product_name,description,price,category,image,stock,status } = req.body;
      

      const token = req.header('Authorization');
      let checkPriv = await utl_func.verifyToken(token.split(" ")[1]);

      if(checkPriv){
        const newUser = await productService.createProduct(product_name,description,price,category,image,stock,status);
        return utl_func.sendSuccessResponse(res, 'Product created successfully', newUser);
      }else{
        return utl_func.sendErrorResponse(res, 400, 'You are not authorized to create product');
      }



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

// getProduct

function getProduct(req,res) {
  return new Promise(async (resolve, reject) => {
    try {
      
        const product = await productService.getProduct();
        return utl_func.sendSuccessResponse(res, 'Product fetched successfully', product);
      
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

// getProductById

function getProductById(req,res) {
  return new Promise(async (resolve, reject) => {
    try {
      const id = req.params.id;
      const product = await productService.getProductById(id);
      return utl_func.sendSuccessResponse(res, 'Product fetched successfully', product);
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

// updateProduct

function updateProduct(req,res) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = req.header('Authorization');
      let checkPriv = await utl_func.verifyToken(token.split(" ")[1]);

      if(checkPriv){
      const id = req.params.id;
      const { product_name,description,price,category,image,stock,status } = req.body;
      const product = await productService.updateProduct(id,product_name,description,price,category,image,stock,status);
      return utl_func.sendSuccessResponse(res, 'Product updated successfully', product);
      }else{
        return utl_func.sendErrorResponse(res, 400, 'You are not authorized to update product');
      }
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

// deleteProduct

function deleteProduct(req,res) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = req.header('Authorization');
      let checkPriv = await utl_func.verifyToken(token.split(" ")[1]);

      if(checkPriv){
        const id = req.params.id;
        const product = await productService.deleteProduct(id);
        return utl_func.sendSuccessResponse(res, 'Product deleted successfully', product);
      }else{
        return utl_func.sendErrorResponse(res, 400, 'You are not authorized to delete product');
      }
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

//createCategory
  
function createCategory(req,res) {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate input using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return utl_func.sendErrorResponse(res, 400, errors.array());
      }

      const { category_name } = req.body;
      const token = req.header('Authorization');
      let checkPriv = await utl_func.verifyToken(token.split(" ")[1]);

      if(checkPriv){
        const newCategory = await productService.createCategory(category_name);
        return utl_func.sendSuccessResponse(res, 'Category created successfully', newCategory);
      }else{
        return utl_func.sendErrorResponse(res, 400, 'You are not authorized to create category');
      }

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

function updateCategory(req,res){
  return new Promise(async (resolve, reject) => {
    try {
      const id = req.params.id;
      const { category_name} = req.body;
       const category = await productService.updateCategory(id,category_name);
      return utl_func.sendSuccessResponse(res, 'Category updated successfully', category);
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

//getcategorywiseproductlist using agregation lookup 

function getcategorywiseproductlist(req,res){
  return new Promise(async (resolve, reject) => {
    try {
      const id = req.params.id;
      const product = await productService.getcategorywiseproductlist();
      return utl_func.sendSuccessResponse(res, 'Product fetched successfully', product);
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
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  getcategorywiseproductlist,
};

