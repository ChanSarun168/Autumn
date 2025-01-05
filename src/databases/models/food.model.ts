import mongoose, { Schema } from 'mongoose';

const FoodSchema = new Schema({
    name : {type : String , require:true},
    price : {type : Number , require:true},
    type : {type :String , enum:["food","drink"] , require:true},
    thumbnail : {type:String , require:true},
    isdeleted : {type:Boolean , default:false}
},{
    toJSON: {
        transform(_doc, ret) {
          delete ret.__v;
        },
      },
})

export const FoodModel = mongoose.model("Food" , FoodSchema);