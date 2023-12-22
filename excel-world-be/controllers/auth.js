import joi from 'joi';
import nodemailer from 'nodemailer'
import { hashPassword, comparePassword } from "../helpers/authHelp.js";
import { userModel } from "../models/user.js";
import jwt from 'jsonwebtoken'
import { verifyModel } from '../models/verify.js';
import passport from 'passport';
import { OAuth2Strategy } from "passport-google-oauth"
import { Strategy } from 'passport-twitter'


// user register
export const signUpController = async (req, res) => {
  try {
    const userSchema = joi.object({
      name: joi.string().pattern(new RegExp("^[A-Za-z]{3,15}$")).required(),
      surname: joi.string().pattern(new RegExp("^[A-Za-z]{3,15}$")).required(),
      email: joi.string().email({ tlds: { allow: ["com", "net", "ru", "az"] } }).required(),
      password: joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,30}$")).required(),
      location: joi.string().required()
    })
    const { error, value } = userSchema.validate(req.body)
    if (error) {
      return res.status(400).send({ succcess: false, error: error.message })
    }
    const userExist = await userModel.findOne({ email: value.email })
    if (userExist) {
      return res.status(403).send({ success: false, message: "User already exists" })
    }
    const hashPass = await hashPassword(value.password)
    const newUser = await userModel.create({ ...value, password: hashPass })
    return res.status(201).send({ success: true, message: "User register successfully", newUser })

  } catch (error) {
    return res.status(500).send({ success: false, message: "Signup in Error", error: error.message })
  }
}

// user login
export const signInController = async (req, res) => {
  try {
    const userSchema = joi.object({
      email: joi.string().email({ tlds: { allow: ["com", "net", "ru", "az"] } }).required(),
      password: joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,30}$")).required()
    })
    const { error, value: { email, password } } = userSchema.validate(req.body)
    if (error) {
      return res.status(400).send({ succcess: false, error: error.message })
    }
    const userExist = await userModel.findOne({ email })
    if (!userExist) {
      return res.status(404).send('Email not found, Please sign up...')
    }

    //Admin role and password check
    if (userExist.password === password && userExist.role === 'admin') {
      const token = jwt.sign({ _id: userExist._id, email, role: userExist.role }, process.env.JWT_SECRET_ADMIN)
      return res.status(200).send({ success: true, message: "Admin token", token })
    }

    // Check password
    const passRight = await comparePassword(password, userExist.password)
    if (!passRight) {
      return res.status(401).send({ success: false, message: 'Password is wrong!' })
    }
    const token = jwt.sign({ _id: userExist._id, email, role: userExist.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).send({ success: true, message: "User token", token })

  } catch (error) {
    return res.status(500).send({ success: false, message: "Signin in Error", error: error.message })
  }
}


// forgot password
export const forgotPassController = async (req, res) => {
  try {
    const userSchema = joi.object({
      email: joi.string().email({ tlds: { allow: ["com", "net", "ru", "az"] } }).required()
    })
    const { error, value: { email } } = userSchema.validate(req.body)
    if (error) {
      return res.status(400).send({ succcess: false, error: error.message })
    }
    // check user
    const userExist = await userModel.findOne({ email })
    if (!userExist) {
      return res.status(404).send({ success: false, message: "Email not found!" })
    }

    // sending the confirmation code to the email address
    const verify_code = Math.floor(Math.random() * 1000000)
    await verifyModel.create({ verifyCode: verify_code, userEmail: userExist.email })

    // gmail information
    let mailTransporter = nodemailer.createTransport({
      port: 587,
      service: "gmail",
      auth: {
        user: "quliyevnamiq8@gmail.com",
        pass: "vwwgaysbferftezu"
      },
    });

    // message details
    let details = {
      from: "quliyevnamiq8@gmail.com",
      to: `${email}`,
      subject: 'User verify code',
      html: `Verify Code : ${verify_code}`
    }

    // message sending
    mailTransporter.sendMail(details, (err) => {
      if (err) {
        return res.status(400).send({ success: false, error: err.message });
      }
      return res.status(200).send({ success: true, message: "The verification code has been sent to the email address" })
    })
  } catch (error) {
    console.log(error)
  }
}

//verify code
export const verifyController = async (req, res) => {
  try {
    const verifySchema = joi.object({
      verifyCode: joi.number().required()
    })
    const { error, value: { verifyCode } } = verifySchema.validate(req.body)
    if (error) {
      return res.status(400).send({ succcess: false, error: error.message })
    }
    const check_confirmation = await verifyModel.findOne({ verifyCode })
    if (!check_confirmation) {
      return res.status(401).send({ success: false, message: "Verification code is incorrect" })
    }
    const token = jwt.sign({ email: check_confirmation.userEmail }, process.env.JWT_SECRET)
    return res.status(200).send({ success: true, message: "Verification code is correct", token })
  } catch (error) {
    console.log(error)
  }
}

// User password recovery = > tokene ID elave etmek
export const recoveryController = async (req, res) => {
  const { token } = req.params
  if (!token) {
    return res.status(400).send({ success: false, message: "Token is invalid" })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, forget) => {
    if (err) {
      return res.status(401).send({ success: false, message: "Token is wrong" })
    }
    const userSchema = joi.object({
      new_password: joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,30}$")).required(),
      repeat_password: joi.string().equal(joi.ref('new_password')).required()
    })
    const { error, value } = userSchema.validate(req.body)
    if (error) {
      return res.status(401).send({ success: false, message: error.message })
    }
    const hashPass = await hashPassword(value.new_password)
    await userModel.findOneAndUpdate({ email: forget.email }, { $set: { password: hashPass } }, { new: true })
    return res.status(200).send({ success: true, message: "Your password is updated" });
  })
}


// google oauth
export const signUpWithGoogle = () => {

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
  passport.use(new OAuth2Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
    async function (accessToken, refreshToken, profile, done) {
      await userModel.create({
        email: profile.emails[0].value,
        password: await hashPassword(profile.id)
      })
      return done(null, profile);
    }
  ));
}

export const signUpWithTwitter = () => {

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
  passport.use(new Strategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:8080/auth/twitter/callback"
  },
    async function (accessToken, refreshToken, profile, done) {
      await userModel.create({
        username: profile.username,
        password: await hashPassword(profile.id)
      })
      return done(null, profile);
    }
  ));
}
