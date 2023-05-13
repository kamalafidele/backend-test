const MovieModel = require('../models/Movie');

class MovieRepo {
  static async save(data) {
    return MovieModel.create(data);
  }

  static async findById(id) {
    return MovieModel.findById(id);
  }

  static async findAll() {
    return MovieModel.find().exec();
  }

  static async updateById(id, data) {
    return MovieModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  static async deleteById(id) {
    return MovieModel.findByIdAndDelete(id);
  }
}

module.exports = MovieRepo;
