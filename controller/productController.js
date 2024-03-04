import productModel from "../modals/productModel.js";
import slugify from "slugify";
import fs from "fs";


// create product controller
export const createProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({message: 'Require Product Name'});
            
            case !description:
                return res.status(500).send({message: 'Require Product Description'});
            
            case !price:
                return res.status(500).send({message: 'Require Product Price'});

            case !category:
                return res.status(500).send({message: 'Require Product Category'});
            
            case !quantity:
                return res.status(500).send({message: 'Require Product Quantity'});

            case photo && photo.size > 1000000:
                return res.status(500).send({message: 'Require Product Photo and Photo Should be Less Than 1MB'});
        }

        const product = new productModel({...req.fields, slug: slugify(name)});
        
        //photo
        if(photo)
        {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();

        res.status(201).send(
            {
                success: true,
                message: 'Product Created Succesfully',
                product,
            }
        )

    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'error in creating Product',
                error,
            }
        )
    }
}

// get all products controller
export const getallProductsController = async (req, res) => {
    try {
        const allProducts = await productModel.find({}).populate('category').select("-photo").limit(12).sort({CreatedAt: -1});;
        res.status(201).send(
            {
                success: true,
                totalCount: allProducts.length,
                message: 'Fetched All Products',
                allProducts,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Getting a Product',
                error,
            }
        )
    }
}

// get single Product controller
export const singleProductController = async (req, res) => {
    try {
        const singleProduct = await productModel.findOne({slug: req.params.slug}).populate('category').select('-photo').limit(12).sort({CreatedAt: -1});
        await res.status(200).send(
            {
                success: true,
                message: 'Succesfully Fetched',
                singleProduct,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Fetching The Product',
                error,
            }
        )
    }
}

//get product photo controller
export const getPrductPhotoController = async (req, res) => {
    try {
        const productPhoto = await productModel.findById(req.params.pid).select('photo');
        if(productPhoto.photo.data)
        {
            res.set('Content-type', productPhoto.photo.contentType);
            res.status(201).send(productPhoto.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Getting a photo',
                error,
            }
        )
    }
}

//delete product controller
export const deleteProductController = async (req, res) => {
    try {
        const deleteProduct = await productModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(201).send(
            {
                success: true,
                message: 'Product Succesfully Deleted',
                deleteProduct,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Deleting Product',
                error,
            }
        )
    }
}


//update product controller
export const updateProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({message: 'Require Product Name'});
            
            case !description:
                return res.status(500).send({message: 'Require Product Description'});
            
            case !price:
                return res.status(500).send({message: 'Require Product Price'});

            case !category:
                return res.status(500).send({message: 'Require Product Category'});
            
            case !quantity:
                return res.status(500).send({message: 'Require Product Quantity'});

            case photo && photo.size > 1000000:
                return res.status(500).send({message: 'Require Product Photo and Photo Should be Less Than 1MB'});
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug: slugify(name)});
        
        //photo
        if(photo)
        {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();

        res.status(201).send(
            {
                success: true,
                message: 'Product Created Succesfully',
                product,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Updating Product',
                error,
            }
        )
    }
}