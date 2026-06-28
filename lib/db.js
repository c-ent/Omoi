import mongoose from "mongoose";

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "omoi",
  });
}
