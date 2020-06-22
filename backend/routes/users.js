const router = require('express').Router();
let User = require('../models/user.model');
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
  // res.send('Users');
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  //Save user
  newUser
    .save()
    .then(() => res.json(`User ${username} added`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
