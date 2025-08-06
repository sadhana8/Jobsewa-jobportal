import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Mongo_url, {
      dbName: "jobsewa",
    });
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
