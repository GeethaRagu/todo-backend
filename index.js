import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/Config.js";
import authRoute from "./Routers/authRouter.js";
import todoRoute from "./Routers/todoRouter.js"
const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(cors({
    origin:process.env.BASE,
    credentials:true
}));


// custom routes
app.use('/api/auth',authRoute);
app.use('/api/todo',todoRoute);
connectDB();
//defaultroutes
app.get('/',(req,res)=>{
    res.send("Welcome to TODO app")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port`);
})

