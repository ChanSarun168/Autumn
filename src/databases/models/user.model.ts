import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type:String , require: true},
    email : {type:String , require:true},
    phonenumber : {type:String , require:true},
    password : {type:String , require:true},
    profile : {type:String}
},
{
    toJSON: {
        transform(_doc, ret) {
          delete ret._id;
          delete ret.__v;
        },
    },
})

export const UserModel = mongoose.model("User" , userSchema);