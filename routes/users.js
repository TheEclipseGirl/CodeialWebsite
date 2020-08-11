const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/sign-in',passport.notAuthenticated, usersController.signIn);
router.get('/sign-up',passport.notAuthenticated, usersController.signUp);
router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/sign-in'
}),usersController.createSession);

router.get('/sign-out',passport.checkAuthentication,usersController.destroySession);
module.exports = router;