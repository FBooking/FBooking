import mongoose from 'mongoose';
import Constants from './config/constants';

// Thêm prototype Promise cho mongoose
mongoose.Promise = global.Promise;

// Kết nối đến database;
console.log('Kết nối đến', Constants.mongo.uri);
mongoose.connect(Constants.mongo.uri, {
  useMongoClient: true,
});
mongoose.connection.on('error', (err) => {
  throw err;
});
