import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";

let app  = express();
dotenv.config();

app.use(bodyParser.json({limit:"200mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"200mb",extended:true}));
app.use(cors());
app.use('/posts',postRoutes);
app.use('/user',userRoutes);

app.get('/',(req,res)=>{
    res.send("APP IS RUNNING");
});

let PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message));

// mongoose.set('useFindAndModify',false);