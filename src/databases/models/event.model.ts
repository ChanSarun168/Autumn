import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name : {type:String , require: true},
    date : {type : Date , require:true},
    isSpecial : {type:Boolean , default : false},
    isFull : {type : Boolean , default : false},
    description : {type : String , require: true},
    thumbnail : {type:String , require: true},
    booking_table : [{type:String , ref: "table"}],
    isdeleted : {type:Boolean , default:false}
},
{
    toJSON: {
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
})

export const EventModel = mongoose.model("Event" , eventSchema);

