import generateToken from "../helper/createToken";
import User from "../model/user.mode";
import bcryptjs from "bcryptjs";
export const signUp = async (req, res) => {
  //   console.log("signup");
  const data = req.body;
  //   console.log(body);
  const { fullName, userName, password, gender, profilePicture } = data;
  try {
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // before save hashed the password
    const numberOfHashedRounds = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, numberOfHashedRounds);

    const avatar =
      "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png";
    //   if new user then save
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      profilePicture: avatar,
      gender,
    });
    // generate a token
    generateToken(newUser._id, res);
    // save the user
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      profilePicture: newUser.profilePicture,
      gender: newUser.gender,
    });
  } catch (error) {
    console.log("error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const existingUser = await User.findOne({ userName });
    const isPassCorrect = await bcryptjs.compare(
      password,
      existingUser.password || ""
    );
    if (!existingUser || !isPassCorrect) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    generateToken(existingUser._id, res);
    res.status(200).json({
      _id: existingUser._id,
      fullName: existingUser.fullName,
      userName: existingUser.userName,
      profilePicture: existingUser.profilePicture,
      gender: existingUser.gender,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong",
    });
  }
};
