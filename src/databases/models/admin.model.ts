import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email : {type: String , require: true},
    password : {type : String , require: true}
},
{
    toJSON: {
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
})

export const AdminModel = mongoose.model("Admin" , adminSchema);

