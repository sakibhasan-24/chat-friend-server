import User from "../model/user.model";

export const getAllUserForChat = async (req, res) => {
  try {
    const userWithOutLoggedUser = await User.findOne({
      _id: { $ne: req.user._id },
    }).select("-password");
    res.status(200).json(userWithOutLoggedUser);
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
};
