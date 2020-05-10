const express = require ('express');
const router = express.Router ();
const {check} = require ('express-validator');
const UserCtrl = require ('./../controllers/user');
const bookingMiddleware = require ('./../controllers/booking');

router.post (
  '/',
  [
    UserCtrl.authMiddleware,
    [
      check ('endAt', 'Please provide the date').not ().notEmpty (),
      check ('startAt', 'Please provide the date').not ().notEmpty (),
    ],
  ],
  bookingMiddleware.createBooking
);

module.exports = router;
