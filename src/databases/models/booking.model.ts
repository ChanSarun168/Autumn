import mongoose from "mongoose";

const bookingInfoSchema = new mongoose.Schema({
    tables : [{type: String, required: true}],
    customer_id : {type: String},
})

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  booking_info: [bookingInfoSchema]
},
{
  toJSON: {
    transform(_doc, ret) {
      delete ret.__v;
    },
  },
});

bookingSchema.pre('save', function(next) {
  if (this.isModified('date')) {
    const date = new Date(this.date);
    this.date = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  }
  next();
});

export const BookingModel = mongoose.model("Booking", bookingSchema);