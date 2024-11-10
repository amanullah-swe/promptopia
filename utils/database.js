import mongoose from "mongoose";

let isConnected = false;

export const connectTODB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Already");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGDB_URL, {
      dbName: "share_propt",
    });

    isConnected = true;
    console.log("mongo db connected");
  } catch (error) {
    console.log("mongo db error :", error);
  }
};
