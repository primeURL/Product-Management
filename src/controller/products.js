const Product = require('../models/product')
const ErrorHandler = require('../features/utility-class')

const createProduct = async(req,res,next)=>{
    try {
        const {title,category,price} = req.body
        if(!title || !category || !price){
            return next(new ErrorHandler('Please add all Fileds',400))
        }
        let product = await Product.findOne({ title: req.body.title });
		if(product){
             return next(new ErrorHandler('Product already Exist',409))
        }
        if(req.body.isDisplayed){
            return next(new ErrorHandler('User can not set display property true',409))
        }
    
        product = await new Product({ ...req.body}).save();
        return res.status(200).json({ message: 'Product Created Successfully' , product})

    } catch (error) {
        next(error)
    }
}

const updateProduct = async(req,res,next)=>{
    try {
        const {productId} = req.params
        const {title,category,price} = req.body
        const product = await Product.findById(productId)

        if(!product){
            return next(new ErrorHandler('Invalid Product Id',400))
        }
        
        if(title) product.title = title
        if(category) product.category = category
        if(price) product.price = price
        await product.save()
        return res.status(200).json({message : 'Product Updated Successfully By Admin'})
		
    } catch (error) {
        next(error)
    }
}
const deleteProduct = async(req,res,next)=>{
    try {
        const {productId} = req.params
        const product = await Product.findById(productId)
        if(!product){
            return next(new ErrorHandler('Invalid Product Id',400))
        }
        await product.deleteOne()
        return res.status(200).json({
            message : 'Product Deleted Successfully By Admin'
        })
    } catch (error) {
        return next(error)
    }
}
const approveProducts = async(req,res,next) => {
    try {
        const { productIds } = req.body;
        if (!Array.isArray(productIds)) {
           return next(new ErrorHandler('Empty product IDs',400))
        }

        const products = await Product.updateMany(
            { _id: { $in: productIds } }, 
            { $set: { isDisplayed: true } }
        );
        if (products.modifiedCount === 0) {
            return res.status(404).json({ message: 'No products found or updated' });
        }

        res.status(200).json({ message: `${products.modifiedCount} products updated successfully` });
    } catch (error) {
        next(error)
    }
}
const displayAdminApprovedProducts = async(req,res,next) => {
    try {
        const products = await Product.find({isDisplayed : true})
        if(!products){
            return next(new ErrorHandler(`Admin haven't approved products yet`,404))
        }
        return res.status(200).json({
            message : "Admin Approved Products",
            products
        })
    } catch (error) {
        next(error)
    }
}

// This is test Controller
const allProducts = async(req,res,next) =>{
    try {
        const products = await Product.find({});
		return res.status(200).json({products})
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createProduct, updateProduct, deleteProduct, displayAdminApprovedProducts,approveProducts,allProducts
}