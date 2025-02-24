import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
    minlength : 6,
  },
  gender:{
    type:String,
    required:true,
    enum:["Male","Female"]
  },
  todos:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ToDo",
    default:[]
  }],
  // todos: {
  //     type:Array,
  //   }
  
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;