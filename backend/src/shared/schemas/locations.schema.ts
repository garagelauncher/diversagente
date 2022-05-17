import mongoose from 'mongoose';

export const LocationsSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
    },
  },
});
