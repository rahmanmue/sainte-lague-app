import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await Users.findOne({
      where: {
        id: user_id,
      },
    });

    if (user?.role === "admin") {
      const users = await Users.findAll({
        attributes: ["id", "name", "email", "role"],
      });
      res.status(200).json(users);
    } else {
      const users = await Users.findOne({
        attributes: ["id", "name", "email", "role"],
      });
      res.status(200).json(users);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({
      attributes: ["id", "name", "email", "role"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};

export const updateUserById = async (req, res) => {
  const { name, email, password, role } = req.body;
  let data;
  if (password === "" || !password) {
    data = {
      name: name,
      email: email,
      role: role,
    };
  } else {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    data = {
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    };
  }
  try {
    await Users.update(data, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.error(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({
      msg: "Password dan Confrim Password Tidak Sama",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    res.json({
      msg: "Register Berhasil",
    });
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res) => {
  try {
    // console.log(req.body);
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.json({ msg: "password salah" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const role = user[0].role;
    const accessToken = jwt.sign(
      {
        userId,
        name,
        email,
        role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ accessToken });
  } catch (error) {
    res.json({
      msg: "email tidak ditemukan",
    });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refreshToken: refreshToken,
    },
  });

  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    {
      refreshToken: null,
    },
    {
      where: {
        id: userId,
      },
    }
  );

  return res.sendStatus(200);
};
