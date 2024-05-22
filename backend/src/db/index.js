import mongoose, { mongo } from "mongoose";


const connectDB =  async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${ connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MONGODB connection error",error);
        process
    }
}

export default connectDB