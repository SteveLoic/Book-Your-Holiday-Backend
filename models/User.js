const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');

// username: min 4 max 32
// email: unique and regex
//password: string, min 4 max 32
//

const UserSchema = mongoose.Schema ({
  username: {
    type: String,
    min: [4, 'Too long, min is 4 characters'],
    max: [32, 'Too long , max is 32 characters'],
    required: true,
  },
  email: {
    type: String,
    min: [4, 'Too long, min is 4 characters'],
    max: [32, 'Too long , max is 32 characters'],
    unique: true,
    required: 'Email si required',
    lowerCase: true,
    // match:[[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?]
  },
  password: {
    type: String,
    required: 'Password is required',
    min: [4, 'Too long, min is 4 characters'],
    max: [32, 'Too long , max is 32 characters'],
  },
  rentals: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rental'}],
  bookings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Booking'}],
});

UserSchema.methods.hasSamePassword = function (requestedPassword) {
  return bcrypt.compareSync (requestedPassword, this.password);
};

UserSchema.pre ('save', function (next) {
  const user = this;
  bcrypt.genSalt (10, function (err, salt) {
    bcrypt.hash (user.password, salt, function (err, hash) {
      user.password = hash;
      next ();
    });
  });
});

module.exports = mongoose.model ('User', UserSchema);
