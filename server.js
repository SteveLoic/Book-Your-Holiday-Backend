const express = require ('express');
const Rental = require ('./models/Rental');
const FakeDb = require ('./models/fake-db');
const rentalRoutes = require ('./routes/rentals');
const userRoutes = require ('./routes/auth');
const bookingRoutes = require ('./routes/booking');

const connectDb = require ('./config/db');

connectDb ();

const app = express ();

const PORT = process.env.PORT || 3000;

app.use (express.json ({extended: false}));

app.use ('/api/v1/rentals', rentalRoutes);
app.use ('/api/v1/users', userRoutes);
app.use ('/api/v1/booking', bookingRoutes);

/* const fakedb = new FakeDb ();
fakedb.seeDb (); */

app.listen (PORT, () => {
  console.log (`The server is running on the port ${PORT}`);
});
