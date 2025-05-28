import mongoose from "mongoose";

const bookingHistorySchema = new mongoose.Schema({
  date:    { type: String, required: true },       // stored as YYYY-MM-DD
  tables: [{ type: String, required: true }]
}, { _id: false });  // no separate _id for each entry

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    phonenumber: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profile: { type: String },
    isdeleted: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["Admin", "Customer"],
      default : "Customer"
    },
    // ← Add this block:
    booking_history: {
      type: [bookingHistorySchema],
      default: []
    }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export const UserModel = mongoose.model("User", userSchema);
