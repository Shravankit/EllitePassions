import categoryModel from "../modals/categoryModel.js";
import slugify from "slugify";

//create category controller
export const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body;

        if(!name)
        {
            res.status(401).send({message: 'Name is Required'});
        }

        //existing Category

        const existingCategory = await categoryModel.findOne({name});

        if(existingCategory)
        {
            res.status(200).send({
                success: true,
                message: 'Category Already exists',
            });
        }

        const category = await new categoryModel({name, slug: slugify(name)}).save();

        res.status(201).send(
            {
                success: true,
                message: 'Category Created Succesfully',
                category,
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Creating Category',
                error,
            }
        )
    }
}

//update category controller
export const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;

        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true});
        res.status(200).send(
            {
                success: true,
                message: 'Category Updated Succesful',
                category,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Updating Category',
                error,
            }
        )
    }
}

// get all categories controller
export const getAllController = async (req, res) => {
    try {
        const allCategories = await categoryModel.find({});
        res.status(201).send(
            {
                success: true,
                message: "Fetched All Categories",
                allCategories,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Failed in Getting Categories',
                error,
            }
        )
    }
}

// get one category controller
export const getOneCategoryCOntroller = async (req, res) => {
    try {
        const oneCategory = await categoryModel.findOne({slug: req.params.slug});
        res.status(201).send(
            {
                success: true,
                message: 'Get Single Category Succesful',
                oneCategory,
            }
        )
    } catch (error) {
        console.log(error);
        res.status.send(
            {
                success: false,
                message: "Error in fetching Category",
                error,
            }
        )
    }
}

//delete one category
export const deleteOneCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send(
            {
                success: true,
                message: 'Category Deleted Sucesfully',
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'error in Deleting Category',
                error,
            }
        )
    }
}