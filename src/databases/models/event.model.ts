import mongoose from "mongoose";

const eventInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  isSpecial: { type: Boolean, default: false },
  thumbnail: { type: String, required: true },
  admin_id: { type: String }
});

const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  isFull: { type: Boolean, default: false },
  booking_info: [{ type: String, ref: "table" }],
  isdeleted: { type: Boolean, default: false },
  event_info: [eventInfoSchema]
},
{
  toJSON: {
    transform(_doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
});

eventSchema.pre('save', function(next) {
  if (this.isModified('date')) {
    const date = new Date(this.date);
    this.date = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  }
  next();
});

export const EventModel = mongoose.model("Event", eventSchema);