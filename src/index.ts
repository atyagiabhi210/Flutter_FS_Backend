import bodyParser from "body-parser";
import { error } from "console";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import http from "http";
import mongoose from "mongoose";
import router from "./routes/routes";

// here I will config my dotenv file so that I can use the environment variables mainly to connect and config
// my database MONGODB
dotenv.config();


// here we are initializing the express server
const app: Express=express();
//here we create our server and pass our Express app to it  
const server=http.createServer(app);
//Express Configuration

// here we are using cors basically we use cors so that any client can make a request to our server
app.use(cors());
// we use body-parser to parse the incoming request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//here we set the port where my server will run
app.set("PORT",3000);
// here we set our base url we can also modify it to our domain name
app.set("BASE_URL","localhost");

console.log('Hello, world!');
//Routes
// Here we are using our router which we have defined in our routes folder mainly setting up our router
app.use("/api/V1",router);
//MONGO URI CONNECTION
const mongoURI= process.env.MONGO_DB_URI;
if(!mongoURI){
    console.error("Mongo URI is not defined");
    process.exit(1);
}
mongoose.connect(mongoURI,{}).then(()=>{
    console.log("MongoDB connected");
})
.catch((error)=>{
    console.error("MongoDB connection failed");
    console.error(error);
   // process.exit(1);

});
// start the server
try{
    const port:Number =app.get("PORT");
    const baseUrl:String =app.get("BASE_URL");
    server.listen(port, ():void => {
        console.log(`Server is running on http://${baseUrl}:${port} `);
        console.log('balle');
    })
}
catch{
    console.log(error);
}
// now we will export our server
export default server;