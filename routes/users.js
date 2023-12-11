import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
  clearAllFriends
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.delete("/clear", verifyToken, clearAllFriends);

/* UPDATE */
router.patch("/:userId/:friendId", verifyToken, addRemoveFriend);
router.patch("/:id", verifyToken, updateUser);


export default router;
