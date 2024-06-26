import mongoose from "mongoose";
import 'dotenv/config';

const MONGO_URL = process.env.MONGO_URL;

export const initMongoDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(MONGO_URL);
        console.log("Bienvenido profe =D Se conecto a la base de datos de MongoDB");
    } catch (error) {
        console.log(`A ocurrido un error al intentar conectarse a la base de MongoDB ='(  -->  ${error}`);
    };
};