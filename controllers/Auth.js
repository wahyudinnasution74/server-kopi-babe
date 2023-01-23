const UserModel = require("../models/User");
const SupplierModel = require("../models/Supplier");

class Auth {
  static async list(_, res) {
    try {
      const user = await UserModel.find({});

      return res.json({ user });
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (user === {} || !user) throw new Error("User Not Found");

      if (user.password !== password) throw new Error("Wrong password");

      return res.json(user);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  static async loginSupplier(req, res) {
    try {
      const { username, password } = req.body;
      const user = await SupplierModel.findOne({ username });
      if (user === {} || !user) throw new Error("User Not Found");

      if (user.password !== password) throw new Error("Wrong password");

      return res.json(user);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  static async signup(req, res) {
    try {
      const { username, password } = await req.body;

      const newUser = new UserModel({
        username,
        password,
      });

      const savedUser = await newUser.save();

      return res.json(savedUser);
    } catch (error) {
      return res.json(error.message);
    }
  }
}

module.exports = Auth;
