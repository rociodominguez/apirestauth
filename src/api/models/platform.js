const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const platformSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    movies: [{ type: mongoose.Types.ObjectId, ref: "movies", required:true }],
  },
  {
    timestamps: true,
    collection: "platforms"
  }
);

const Platform = mongoose.model('platforms', platformSchema, "platforms");
module.exports = Platform;