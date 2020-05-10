const {validationResult} = require ('express-validator');

exports.createBooking = function (req, res) {
  const errors = validationResult (req);

  if (!errors.isEmpty) {
    res.status (400).json ({errors: errors.array ()});
  }
  const {
    endAt,
    startAt,
    totalPrice,
    days,
    guests,
    createAt,
    user,
    Rental,
  } = req.body;

  console.log (endAt);
  if (endAt === '') {
    return res.status (404).json ({bad: 'BadRequest'});
  }

  res.status (200).json ({ok: 'true'});
};
