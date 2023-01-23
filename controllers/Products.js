const ProductModel = require("../models/Product");
const ObjectId = require("mongoose").Types.ObjectId;

class Product {
  static async list(_, res) {
    try {
      const docs = await ProductModel.find({})
        .populate("supplier")
        .sort({ quantity: 1 });

      return res.json(docs);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async listBySupplierId(_, res) {
    try {
      const { supplierId } = req.query;
      const docs = await ProductModel.find({
        suplier: new ObjectId(supplierId),
      }).sort({ quantity: 1 });

      return res.json(docs);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async createMany(req, res) {
    try {
      const { data } = req.body;
      const docs = await ProductModel.insertMany(data);
      return res.json(docs);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async create(req, res) {
    try {
      const { name, quantity, unit, supplierId, minimumQuantity } = req.body;
      const product = await ProductModel.findOne({ name });
      if (product) throw new Error("Product already been registered");

      const newProduct = new ProductModel({
        name,
        quantity,
        unit,
        supplier: supplierId,
        minimumQuantity,
      });

      const docs = await newProduct.save();
      return res.json(docs);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async delete(req, res) {
    try {
      const { productId } = await req.query;

      const query = { _id: new ObjectId(productId) };
      const docs = await ProductModel.deleteOne(query);
      if (!docs) throw new Error("Product Not Found");

      return res.json(docs);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async update(req, res) {
    try {
      const { productId } = req.query;
      const { newData } = req.body;
      const query = { _id: new ObjectId(productId) };
      const docs = await ProductModel.findOneAndUpdate(query, newData);
      if (!docs) throw new Error("Product Not Found");

      return res.json(docs);
    } catch (error) {
      return res.json(error.message);
    }
  }
}

module.exports = Product;
