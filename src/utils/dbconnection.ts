import getConfig from "./config";
import mongoose from "mongoose"

const mongourl = getConfig().mongoUrl;

const connectToDatabase = async () : Promise<void> =>{
    try{
        await mongoose.connect(`${mongourl}`);
        console.log("MongoDB connected successfully");
    }catch(error){
        console.log("Fail to connect to MongoDB");
        console.log(error);
        process.exit(1);
    }
}

export default connectToDatabase;