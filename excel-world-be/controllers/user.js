import joi from "joi";
import { comparePassword, hashPassword } from "../helpers/authHelp.js";
import { userModel } from "../models/user.js";

// user edit profile
export const editProfileController = async (req, res) => {
  try {
    const userSchema = joi.object({
      name: joi.string().pattern(new RegExp("^[A-Za-z]{3,15}$")).required(),
      surname: joi.string().pattern(new RegExp("^[A-Za-z]{3,15}$")).required(),
      location: joi.string().required(),
      old_password: joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,30}$")),
      new_password: joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,30}$")),
    })
    const { error, value } = userSchema.validate(req.body)
    if (error) {
      return res.status(400).send({ success: false, error: error.message })
    }
    // check user
    const userExist = await userModel.findById(req.user._id)
    if (!userExist) {
      return res.status(401).send({ success: false, error: error.message })
    }
    // password check
    if (value.old_password) {
      const passRight = await comparePassword(value.old_password, userExist.password)
      if (!passRight) {
        return res.status(401).send({ success: false, message: "Password is wrong!" })
      }
      // update user password
      const hashPass = await hashPassword(value.new_password)
      await userModel.findByIdAndUpdate(req.user._id, { $set: { password: hashPass } })
      return res.status(200).send({ success: true, message: "Password update successfully" })
    }
    //update user
    await userModel.findByIdAndUpdate(req.user._id, { $set: { ...value } })
    return res.status(200).send({ success: true, message: "User profile update successfully" })

  } catch (error) {
    return res.status(500).send({ success: false, message: "Error in update profile", error: error.message })
  }
}


// get user profile
export const getProfileController = async (req, res) => {
  try {
    const profile = await userModel.findById(req.user._id).populate({
      path: 'purchased_resourced', select: ['name', 'photo', 'description']
    }).select('-password')
    return res.status(200).send({ success: true, message: "User profile information", profile })
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error in get profile", error: error.message })
  }
}
