import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todoText:{
        type :String,
        required : true
    },
    
},{timestamps:true});

const ToDo = new mongoose.model("ToDo",todoSchema);

export default ToDo;