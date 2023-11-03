import mongoose from "mongoose";

let isConnected = false; //track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("mongo db connnectedd");
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "nextapp-jsm",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            isConnected = true;
            console.log('MongoDB Connected');
    } catch (error){
        console.log(error);
    }
}
