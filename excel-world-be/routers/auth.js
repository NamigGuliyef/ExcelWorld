import { Router } from 'express'
import passport from 'passport'
import { forgotPassController, recoveryController, signInController, signUpController, verifyController } from '../controllers/auth.js'
const r = Router()

// POST => user registration
r.post('/signup', signUpController)

//POST => user login
r.post('/signin', signInController)

//POST => user forgot password
r.post('/forgotPass', forgotPassController)

//POST => user verifycode
r.post('/verifyCode', verifyController)

//POST => user recovery password
r.post('/recoveryPass/:token', recoveryController)

r.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

r.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        // Successful authentication, redirect success.
        res.redirect('/');
    });

r.get('/twitter', passport.authenticate('twitter'))

r.get('/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/error' }),
    function (req, res) {
        // Successful authentication, redirect success.
        res.redirect('/');
    });


export default r

