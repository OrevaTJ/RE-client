import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import generatePassword from '../utils/password.js';

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    res.status(201).json('User created successfully');
  } catch (error) {
    next(error); // call error middleware
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, 'Email or Password incorrect.'));

    const userPassword = bcryptjs.compareSync(password, user.password);
    if (!userPassword)
      return next(errorHandler(401, 'Email or Password incorrect.'));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // remove password from response to client
    const { password: removePassword, ...otherUserDetails } = user._doc;

    res
      .cookie('user_token', token, { httpOnly: true })
      .status(200)
      .json(otherUserDetails);
  } catch (error) {
    next(error); // call error middleware
  }
};

export const google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;

    // Check if the user with the provided email already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      const generatedPassword = generatePassword(16);
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);

      const username =
        name.split(' ').join('').toLowerCase() + generatePassword(4);

      // Create and save the new user to the database
      user = new User({
        username,
        email,
        password: hashPassword,
        profilePhoto: photo,
      });
      await user.save();
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: removePassword, ...otherUserDetails } = user._doc;

    res
      .cookie('user_token', token, { httpOnly: true })
      .status(200)
      .json(otherUserDetails);
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('user_token', { httpOnly: true })
      .status(200)
      .json('Signed out successfully');
  } catch (error) {
    next(error);
  }
}
