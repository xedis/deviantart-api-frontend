// src/models/Deviation.js
import { Schema, model } from 'mongoose';

const deviationSchema = new Schema({
  deviationID: String,
  metaDevID: String,
  title: String,
  link: String,
  published: String,
  mature: String,
  stats: String,
  tierDeviationID: String,
  downloadable: String,
  tierName: String,
  tierURL: String,
  galleryName: String,
  premiumGalleryID: String,
  premType: String,
  dollarPrice: String,
  numSubs: String,
  numViews: String,
  thumbsLink: String,
  matureLevel: String,
  matureClass: String,
  tags: [String],
  desc: String
});

const Deviation = model('Deviation', deviationSchema);

export default Deviation;

