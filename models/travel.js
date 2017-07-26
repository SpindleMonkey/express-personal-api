var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var TravelSchema = new Schema({
  where: String,
  why: String,
  when: String,
  image: String
});

var Travel = mongoose.model('Travel', TravelSchema);

module.exports = Travel;
