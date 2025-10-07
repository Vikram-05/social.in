import mongoose from 'mongoose'

export function connectDB(){
    // console.log("db ",process.env.MONGODB_URL)
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("mongoDb connected");
    })
    .catch(()=>{
        console.log("Error in mongoDB connection");
    })
}