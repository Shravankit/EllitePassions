import express from "express";
import { createProductController, deleteProductController, getPrductPhotoController, getallProductsController, singleProductController, updateProductController } from "../controller/productController.js";
import { isAdmin, requireSignin } from "../middewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//products Routes

//create product route
router.post('/create-product', requireSignin, isAdmin, formidable(), createProductController);

//getting all products controller
router.get('/all-products', getallProductsController);

//get product controller
router.get('/product-photo/:pid', getPrductPhotoController);

//getting single Product route
router.get('/single-product/:slug', singleProductController);

//delete product route
router.delete('/delete-product/:pid', deleteProductController);

//update product rouute
router.put('/update-product/:pid', requireSignin, isAdmin, formidable(), updateProductController);

export default router;