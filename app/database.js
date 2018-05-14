import mongoose from 'mongoose';
import Constants from './config/constants';

// Thêm prototype Promise cho mongoose
mongoose.Promise = global.Promise;

// Kết nối đến database;
console.log('Kết nối đến database');
mongoose.connect(Constants.mongo.uri, {
  useMongoClient: true,
});
mongoose.connection.on('error', (err) => {
  console.log('Lỗi rồi', err);
  throw err;
});
