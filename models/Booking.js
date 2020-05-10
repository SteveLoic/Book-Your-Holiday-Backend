const moongoose = require ('mongoose');

const BookingSchema = moongoose.Schema ({
  endAt: {
    type: Date,
    required: true,
  },
  startAt: {
    type: Date,
    required: true,
  },
  totalPrice: Number,
  days: Number,
  guests: Number,
  createAt: {
    type: Date,
    default: Date.now (),
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  Rental: {type: moongoose.Schema.Types.ObjectId, ref: 'Rental'},
});

module.exports = moongoose.Model ('Booking', BookingSchema);
