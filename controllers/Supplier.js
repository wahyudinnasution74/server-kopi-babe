const SupplierModel = require("../models/Supplier");
const ObjectId = require("mongoose").Types.ObjectId;

class Supplier {
  static async list(_, res) {
    try {
      const docs = await SupplierModel.find({}).sort({ createdAt: -1 });
      return res.json(docs);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async createMany(req, res) {
    try {
      const { data } = req.body;
      const docs = await SupplierModel.insertMany(data);
      return res.json(docs);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async create(req, res) {
    try {
      const { name, phone_number, address, username, password } = req.body;
      const supplier = await SupplierModel.findOne({ name });
      if (supplier) throw new Error("Product already been registered");

      const newSupplier = new SupplierModel({
        name,
        phone_number,
        address,
        username,
        password,
      });

      const docs = await newSupplier.save();
      return res.json(docs);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async delete(req, res) {
    try {
      const { supplierId } = await req.query;

      const query = { _id: new ObjectId(supplierId) };
      const docs = await SupplierModel.deleteOne(query);
      if (!docs) throw new Error("Product Not Found");

      return res.json(docs);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async update(req, res) {
    try {
      const { supplierId } = req.query;
      const { newData } = req.body;
      const query = { _id: new ObjectId(supplierId) };
      const docs = await SupplierModel.findOneAndUpdate(query, newData);
      if (!docs) throw new Error("Product Not Found");

      return res.json(docs);
    } catch (error) {
      return res.json(error.message);
    }
  }
}

module.exports = Supplier;
