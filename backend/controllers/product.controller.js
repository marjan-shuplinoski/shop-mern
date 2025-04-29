import Product from "../models/product.model.js";
import mongoose from "mongoose";

export async function getProducts(req, res) {
    try {
        const products = await Product.find({});
        return res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export async function getProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({success: false, message: "Product not found"})
        }
        return res.status(200).json({success: true, data: product})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export async function createProduct(req, res) {
    const product = req.body
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "All fields are required"})
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        return res.status(201).json({success: true, data: newProduct})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export async function updateProduct(req, res) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({success: false, message: "Invalid ID"})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedProduct) {
            return res.status(404).json({success: false, message: "Product not found"})
        }
        return res.status(200).json({success: true, data: updatedProduct})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}
export async function deleteProduct(req, res) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({success: false, message: "Invalid ID"})
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({success: false, message: "Product not found"})
        }
        return res.status(200).json({success: true, data: deletedProduct})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}