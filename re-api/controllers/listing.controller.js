import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(errorHandler(404, 'Listing not found'));

  if (req.user.id !== listing.userId)
    return errorHandler(401, 'Only delete your own listing');

  try {
    await Listing.findByIdAndDelete(req.params.id);

    return res.status(201).json('Deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(errorHandler(404, 'Listing not found'));

  if (req.user.id !== listing.userId)
    return errorHandler(401, 'Only update your own listing');

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return updated document
        runValidators: true, // enforce validation rules specified in the model's schema
      }
    );

    return res.status(201).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getSingleListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)
    if(!listing) return next(errorHandler(404, 'Not found'))

    res.status(200).json(listing)
  } catch (error) {
    next(error)
  }
}
