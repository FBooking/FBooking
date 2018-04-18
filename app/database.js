import mongoose from 'mongoose';
import Constants from './config/constants';

// Thêm prototype Promise cho mongoose
mongoose.Promise = global.Promise;

// Kết nối đến database;
mongoose.connect(Constants.mongo.uri);
mongoose.connection.on('error', (err) => {
  throw err;
});
