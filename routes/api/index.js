const router = require('express').Router();
const userRoutes = require('./routes-user');
const thoughtRoutes = require('./routes-thought');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;