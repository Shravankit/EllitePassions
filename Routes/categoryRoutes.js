import express from "express";
import { 
    createCategoryController, 
    deleteOneCategoryController, 
    getAllController, 
    getOneCategoryCOntroller, 
    updateCategoryController 
} from "../controller/categoryController.js";

import { requireSignin,
        isAdmin
 } from "../middewares/authMiddleware.js";

const router = express.Router();

//category Routes

//create Category
router.post('/create-category', requireSignin, isAdmin, createCategoryController);

//update category
router.put('/update-category/:id',  requireSignin, isAdmin, updateCategoryController);

//all categories
router.get('/all-categories', getAllController);

//delete category
router.delete('/delete-category/:id',  requireSignin, isAdmin, deleteOneCategoryController);

//single category
router.get('/one-category/:slug', getOneCategoryCOntroller);

export default router;