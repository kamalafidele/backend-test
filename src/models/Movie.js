const { Schema, model } = require('mongoose');

const MovieSchema = new Schema(
  {
    name: { type: String, default: null },
    rank: { type: Number, default: 0 },
    summary: { type: String, default: null },
    mainActors: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = model('Movie', MovieSchema);
