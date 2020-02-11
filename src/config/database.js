const mongoose = require('mongoose').set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/realStateSolution', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;