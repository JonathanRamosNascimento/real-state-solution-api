const mongoose = require('mongoose').set('useCreateIndex', true);
require('dotenv/config');


// mongoose.connect('mongodb://'+process.env.DB_HOST+':27017/'+process.env.DB_NAME, {
mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds163517.mlab.com:63517/heroku_lrxcr96b', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;