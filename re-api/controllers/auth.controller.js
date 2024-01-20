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
    if (!user) return next(errorHandler(404, 'User not found.'));

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
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: removePassword, ...otherUserDetails } = user._doc;

      res
        .cookie('user_token', token, { httpOnly: true })
        .status(200)
        .json(otherUserDetails);
    } else {
      const generatedPassword = generatePassword(16)
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({ 
        username: req.body.name.split(" ").join("").toLowerCase() + generatePassword(4), 
        email: req.body.email, 
        password: hashPassword,
        profilePhoto: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password: removePassword, ...otherUserDetails } = newUser._doc;
      res
        .cookie('user_token', token, { httpOnly: true })
        .status(200)
        .json(otherUserDetails);
    }
  } catch (error) {
    next(error);
  }
};
