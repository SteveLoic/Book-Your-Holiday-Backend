const mongoose = require ('mongoose');

const RentalSchema = mongoose.Schema ({
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  bedrooms: Number,
  shared: Boolean,
  description: {
    type: String,
    required: true,
  },
  dailyRate: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  bookings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Booking'}],
});

module.exports = mongoose.model ('Rental', RentalSchema);
