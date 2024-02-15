import User from "../model/user.mode";
import bcryptjs from "bcryptjs";
export const signUp = async () => {
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
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      profilePicture: avatar,
      gender,
    });
    await newUser.save();
    res
      .status(201)
      .json({
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

export const loginUser = () => {
  console.log("login");
};

export const logoutUser = () => {
  console.log("logout");
};
