const MovieRepo = require('../repositories/MovieRepo');

class MovieService {
  static async save(data) {
    return MovieRepo.save(data);
  }

  static async getMovieById(id) {
    return MovieRepo.findById(id);
  }

  static async getAllMovies() {
    return MovieRepo.findAll();
  }

  static async updateById(id, data) {
    return MovieRepo.updateById(id, data);
  }

  static async deleteMovieById(id) {
    return MovieRepo.deleteById(id);
  }
}

module.exports = MovieService;
