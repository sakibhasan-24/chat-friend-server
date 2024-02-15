import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cokies.token;
    if (!token) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "unauthorized,user not found",
      });
    }
    const { password, ...others } = user._doc;
    req.user = others;
    next();
  } catch {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default verifyToken;
