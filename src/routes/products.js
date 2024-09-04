const express = require('express')
const router = express.Router()
const {adminOnly} = require('../middlewares/index')
const {createProduct,allProducts,updateProduct,deleteProduct,displayAdminApprovedProducts,approveProducts} = require('../controller/products')

// route - /api/v1/products/displayProducts
router.get('/displayProducts', displayAdminApprovedProducts);

// route - /api/v1/products/create
router.post('/create', createProduct);

// route - /api/v1/products/approveProducts
router.post('/approveProducts', adminOnly, approveProducts);

// route - /api/v1/products/update/productId?adminId=1234
router.put('/update/:productId',adminOnly, updateProduct);

// route - /api/v1/products/delete/productId?adminId=1234
router.delete('/delete/:productId',adminOnly, deleteProduct);


// This is Test Route
// route - /api/v1/products/all
router.get('/all', allProducts);


module.exports = router
