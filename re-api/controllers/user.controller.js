import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.send('Hello World!!!');
};

export const updateUser = async (req, res, next) => {
  const { username, email, profilePhoto, password } = req.body;
  const { id: userId } = req.user;
  const { id: requestedUserId } = req.params;

  try {
    if (userId !== requestedUserId)
      return next(errorHandler(401, 'Update not allowed'));

    let hashedPassword;
    if (password) {
      hashedPassword = bcryptjs.hashSync(password, 10);
    }

    const updateObject = {
      $set: {
        username,
        email,
        password: hashedPassword,
        profilePhoto,
      },
    };

    const updatedUser = await User.findByIdAndUpdate(
      requestedUserId,
      updateObject,
      {
        new: true, // return updated document
        runValidators: true, // enforce validation rules specified in the model's schema
      }
    );

    const { password: updatedPassword, ...otherUserDetails } = updatedUser._doc;

    res.status(200).json(otherUserDetails);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'Not authorized'));

  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .clearCookie('user_token', { httpOnly: true })
      .status(200)
      .json('Account deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const userListings = async (req, res, next) => {
  if(req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({userId: req.params.id})
      res.status(200).json(listings)
    } catch (error) {
      next(error)
    }
  }else {
    return next(errorHandler(401, 'You can only view your own listings'))
  }
}
