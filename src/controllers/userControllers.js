const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      msg: "Get All Users",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const createNewUser = async (req, res) => {
  try {
    if (!req.file) {
      console.log(req);
      return res.status(400).json({ message: "No file uploaded" });
    }
    if (req.body.password !== req.body.confPassword)
      return res
        .status(400)
        .json({ msg: "Password dan Confirm Password tidak cocok" });

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      foto: req.file.filename,
      nohp: req.body.nohp,
      alamat: req.body.alamat,
      role: req.body.role,
    };
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    userData.password = hashPassword;

    const newUser = await User.create(userData);

    return res.status(201).json({
      msg: "Create New User Success",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error); //
    return res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};

const updataUser = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.json({
    msg: "Update User",
    data: req.body,
  });
};

const deleteUser = (req, res) => {
  res.json({
    msg: "Delete User",
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updataUser,
  deleteUser,
};
