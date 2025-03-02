import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).send("Please fill all required fields");
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).send("Invalid ID");
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).send("Invalid ID");
  }
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

export default router;