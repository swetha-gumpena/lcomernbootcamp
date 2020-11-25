const Product = require("../models/product");

exports.getProductById = (req,res,next,id) => {
    Product.findById(id)
    .populate("category")
    .exec((err,product) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    })
}

const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");  //file system for path of file

exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            })
        }
        //restrictions
        const {name,description,price,category,stock} = fields; //destructure the data
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please include all fields"
            })
        }

        let product = new Product(fields)
        //handle file here
        if (file.photo){
            if (file.photo.size>3000000){
                return res.status(400).json({
                    error: "File size too big"
                })
            }
            //include file in product
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //save to DB
        product.save((err,product) => {
            if(err){
                res.status(400).json({
                    error: "Saving t-shirt in DB failed"
                })
            }
            res.json(product);
        })
})
}

exports.getProduct = (req,res) => {
    req.product.photo = undefined  //don't want to return this. Will be faster
    return res.json(req.product)
}

exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? req.query.limit : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy,"asc"]])
        .limit(limit)
        .exec((err,products) => {
            if (err) {
                return res.status(400).json({
                    error: "No product found"
                })
            }
            res.json(products)
        })
}

exports.photo = (req,res,next) => {
    if(req.product.photo.data) {
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

exports.deleteProduct = (req,res) => {
    let product = req.product;
    product.remove((err,deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete product"
            })
        }
        res.json({
            message: "Deletion was a success",deletedProduct
        })
    })
}

exports.updateProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            })
        }
        //updation code
        let product = req.product;
        product = _.extend(product,fields)
        
        //handle file here
        if (file.photo){
            if (file.photo.size>3000000){
                return res.status(400).json({
                    error: "File size too big"
                })
            }
            //include file in product
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //save to DB
        product.save((err,product) => {
            if(err){
                res.status(400).json({
                    error: "Saving t-shirt in DB failed"
                })
            }
            res.json(product);
        })
})
}

exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category",{},(err,category) => {
        if(err){
            return res.status(400).json({
                error: "No category found"
            })
        }
        res.json(category)
    })
}
//update Inventory middleware
exports.updateStock = (req,res,next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count,sold: +prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations,{},(err,products) => {
        if (err){
            return res.status(400).json({
                error: "Bulk operation failed"
            })
        }
        next();
    })
}


