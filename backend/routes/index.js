import express from "express";
import {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  Register,
  Login,
  Logout,
} from "../controllers/Users.js";
import {
  insertDapil,
  getAllDapil,
  getDapilById,
  updateDapilById,
  deleteDapilById,
} from "../controllers/Dapil.js";
import {
  insertBulkSuaraParpol,
  getSuaraParpolByDapilId,
  getSuaraParpolById,
  updateSuaraParpolById,
  deleteSuaraParpolById,
} from "../controllers/SuaraParpol.js";

const router = express.Router();

router.post("/users", Register);
router.post("/login", Login);
router.delete("/logout", Logout);

router.get("/users/:user_id", getUsers);
router.get("/detail-user/:id", getUserById);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);

router.get("/dapil/:user_id", getAllDapil);
router.get("/detail-dapil/:id", getDapilById);
router.post("/dapil", insertDapil);
router.put("/dapil/:id", updateDapilById);
router.delete("/dapil/:id", deleteDapilById);

router.get("/parpol/dapil/:dapil_id", getSuaraParpolByDapilId);
router.get("/parpol/suara/:id", getSuaraParpolById);
router.put("/parpol/suara/:id", updateSuaraParpolById);
router.delete("/parpol/suara/:id", deleteSuaraParpolById);
router.post("/parpol", insertBulkSuaraParpol);

export default router;
