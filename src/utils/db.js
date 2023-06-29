import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://techme:techme@cluster0.0i9scge.mongodb.net/?retryWrites=true&w=majority");
    mongoose.set('strictQuery', false);
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
