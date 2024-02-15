import express from "express";
import verifyToken from "../helper/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllUserForChat);

export default router;
