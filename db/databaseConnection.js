import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connection found");
  } catch (error) {
    console.log("Error to conncted", error.message);
  }
};

export default connectToDb;
