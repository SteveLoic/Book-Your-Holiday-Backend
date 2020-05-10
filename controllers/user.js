const {validationResult} = require ('express-validator');
const jwt = require ('jsonwebtoken');
const User = require ('./../models/User');
const config = require ('config');

exports.auth = function (req, res) {
  const errors = validationResult (req);
  if (!errors.isEmpty ()) {
    res.status (400).json ({errors: errors.array ()});
  }

  const {email, password} = req.body;

  User.findOne ({email: email}, (err, existingUser) => {
    if (err) {
      return res.status (500).send ({
        errors: [
          {
            title: 'Server error',
            detail: 'some error occured, server error',
          },
        ],
      });
    }

    if (!existingUser) {
      return res.status (400).json ({
        errors: [{title: 'Invalid User', detail: 'user does not exists'}],
      });
    }
    if (existingUser.hasSamePassword (password)) {
      const token = jwt.sign (
        {
          userId: existingUser.id,
          username: existingUser.username,
        },
        config.get ('secret'),
        {expiresIn: '1h'}
      );
      return res.status (200).json (token);
    } else {
      return res.status (400).json ({
        errors: [
          {
            title: 'Invalid User',
            detail: 'wrong username or wrong password',
          },
        ],
      });
    }
  });
};

exports.register = function (req, res) {
  const errors = validationResult (req);
  if (!errors.isEmpty ()) {
    res.status (400).json ({errors: errors.array ()});
  }

  const {username, email, password, passwordConfirmation} = req.body;

  if (password !== passwordConfirmation) {
    return res
      .status (400)
      .json ({error: 'Password confirmation and password are not the same'});
  }

  User.findOne ({email: email}, (err, existingUser) => {
    if (err) {
      return res.status (500).send ({moongoose: 'server error'});
    }

    if (existingUser) {
      return res.status (400).send ({
        errors: [
          {title: 'Invalid Email', detail: 'Email address already in use'},
        ],
      });
    }

    const user = new User ({
      username,
      email,
      password,
    });

    user.save (err => {
      if (err) {
        return res.status (500).json ({moongoose: 'server error'});
      }

      return res.status (200).json ({register: 'true'});
    });
  });
};

exports.authMiddleware = function (req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken (token);
    User.findById (user.userId, (err, existingsUser) => {
      if (err) {
        return res.status (500).send ({
          errors: [
            {
              title: 'Server error',
              detail: 'some error occured, server error',
            },
          ],
        });
      }

      if (user) {
        res.locals.user = user;
        next ();
      } else {
        return res.status (400).json ({
          errors: [
            {
              title: 'No User found ',
              detail: 'No Token, authorization denied',
            },
          ],
        });
      }
    });
  } else {
    return res.status (400).json ({
      errors: [
        {
          title: 'Not Auhtorization',
          detail: 'No Token, authorization denied',
        },
      ],
    });
  }
};

const parseToken = token => {
  return jwt.verify (token.split (' ')[1], config.get ('secret'));
};
