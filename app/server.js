import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import routes from './routes';
import Constants from './config/constants';

const app = express();

// Bật CORS. Nếu không dùng khi client request lên sẽ lỗi 'No Acccess Origin'
// Tham khảo: ttps://github.com/expressjs/cors
app.use(cors());

// Log các request
// Tham khảo: https://github.com/expressjs/morgan
if (!Constants.envs.test) {
  app.use(morgan('dev'));
}

// Parse body trong các request gửi lên từ phía client
// Tham khảo: https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Khởi tạo các router dùng trong app
console.log('Khởi tạo các router dùng trong app');
app.use(Constants.apiPrefix, routes);

app.listen(Constants.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

export default app;
