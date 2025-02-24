import ToDo from "../Models/toDoModel.js";
import User from "../Models/userModel.js";
import mongoose from "mongoose";
// create todo
export const createtodo = async (req, res) => {
  const userid = req.body.userid;

  try {
    const todouser = await User.findOne({ _id: userid });
    //console.log(todouser);
    const newtodo = new ToDo({
      todoText: req.body.todos,
    });
   // console.log(newtodo);
    await newtodo.save();
   // console.log(todouser.email);
    todouser.todos = [...todouser.todos, newtodo];
    await todouser.save();
    //console.log(todouser);
    const user1 = await User.findById({ _id: userid }).populate("todos");
    user1.save();
    const { password: passkey, ...rest } = user1._doc;
    //console.log(user1);
    res.status(200).json({ message: "Todo added Successfully", rest });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error in ToDo controller" });
  }
};

//get todos for a user
export const gettodos = async (req, res) => {
  try {
    const id = req.params.id;
    const loggeduser = await User.findById({ _id: id }).populate("todos");
    //console.log(loggeduser.todos);
    const usertodos = loggeduser.todos;
    res.status(200).json({ message: "Todos listed Successfully", usertodos });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error in GetToDo controller" });
  }
};

//edit todo

export const edittodo = async (req, res) => {
  try {
    const todoId =new  mongoose.Types.ObjectId(req.params.id);

    const todotext = req.body.todoText;

    const textd = await ToDo.findById({ _id: todoId });

    const results = await ToDo.updateOne(
      { _id: todoId },
      { todoText: todotext }
    );
    //console.log("results",results.matchedCount);
    if (results.matchedCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const updatedtodo = await ToDo.find(todoId);

    res
      .status(200)
      .json({ message: "Todo updated successfully", result: updatedtodo });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error in EditToDo controller" });
  }
};

//delete todo

export const deletetodo = async (req, res) => {
  try {
    const todoId = new mongoose.Types.ObjectId(req.params.id);

    //console.log(todoId);

    const deletedtodo = await ToDo.deleteOne({ _id: todoId });
   // console.log(deletedtodo);
    // if(!deletedtodo){
    //     res.status(404).json({message:"ToDo not found"});
    // }
    if (deletedtodo.deletedCount > 0) {
      res.status(200).json({ message: "ToDo deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error in DeleteToDo controller" });
  }
};

//get todo
export const todotoedit = async (req, res) => {
  try {
    const id = req.params.id;
    const mytodo = await ToDo.findById(id);
    //console.log(loggeduser.todos);
    //const usertodos = loggeduser.todos;
    res.status(200).json({ message: "Todos listed Successfully", mytodo });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error in GetToDo controller" });
  }
};
