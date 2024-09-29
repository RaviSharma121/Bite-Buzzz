import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Mongo_Url);
    console.log("Db connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
