import exprss from "express";
import { sendMessage } from "../controller/message.controller.js";
import verifyToken from "../helper/verifyToken.js";

const router = exprss.Router();

router.get("/get-message/:id", verifyToken, getMessage);
router.post("/send-message/:id", verifyToken, sendMessage);

export default router;
