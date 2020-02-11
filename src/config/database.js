const mongoose = require('mongoose').set('useCreateIndex', true);
require('dotenv/config');


mongoose.connect('mongodb://'+process.env.DB_HOST+':27017/'+process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;