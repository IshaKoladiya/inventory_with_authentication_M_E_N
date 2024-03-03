const utl_func = require('../utils/functions/utilfunction')
const ut_const= require('../utils/constant')
const Product = require('../models/product');
const Category = require('../models/category');

const multer = require('multer');
const path = require('path');


function createProduct(product_name,description,price,category,image,stock,status) {    
  return new Promise(async (resolve, reject) => {
    try {
      // seprate image file and uplode in database in same document

      // const storage = multer.diskStorage({
      //   destination: function(req, file, cb) {
      //     cb(null, 'uploads/');
      //   },
      //   filename: function(req, file, cb) {
      //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      //   }
      // });

      const newProduct = new Product({ product_name,description,price,category,image,stock,status });
      await newProduct.save();
      resolve(newProduct);
    } catch (error) {
      reject(error);
    }
  });
}

// getProduct

function getProduct() {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.find();
      resolve(product);
    } catch (error) {
      reject(error);
    }
  });
}


// getProductById

function getProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);
      resolve(product);
    } catch (error) {
      reject(error);
    }
  });
}

// updateProduct

function updateProduct(id,product_name,description,price,category,image,stock,status) {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);
      if (!product) {
        let err_obj =  new Error('Product not found');
        reject(err_obj);
      }
      product.product_name = product_name;
      product.description = description;
      product.price = price;
      product.category = category;
      product.image = image;
      product.stock = stock;
      product.status = status;
      await product.save();
      resolve(product);
    } catch (error) {
      reject(error);
    }
  });
}


// deleteProduct

function deleteProduct(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findByIdAndDelete(id);
      resolve(product);
    } catch (error) {
      reject(error);
    }
  });
}

//createCategory
function createCategory(category_name) {
  return new Promise(async (resolve, reject) => {
    try {
      const newCategory = new Category({ category_name });
      await newCategory.save();
      resolve(newCategory);
    } catch (error) {
      reject(error);
    }
  });
}
//updateCategory
function updateCategory(id,category_name) {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await Category.findById(id);
      if (!category) {
        let err_obj =  new Error('Category not found');
        reject(err_obj);
      }
      category.category_name = category_name;
      await category.save();
      resolve(category);
    } catch (error) {
      reject(error);
    }
  });
}

async function getcategorywiseproductlist() {
  try {
    const product = await Product.aggregate([{
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category"
      }
    }]);
    return product;
  } catch (error) {
    console.error("Error in getcategorywiseproductlist:", error);
    throw new Error("Failed to fetch category-wise product list");
  }
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

