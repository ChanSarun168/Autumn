import mongoose, { Schema } from "mongoose";

const TableSchema = new Schema({
    table_no : {type : String , require:true},
    capacity : {type : Number , require:true},
    isdeleted : {type:Boolean , default:false}
},{
    toJSON: {
      transform(_doc, ret) {
        delete ret.__v;
      },
    },
});

export const TableModel = mongoose.model("Table" , TableSchema);