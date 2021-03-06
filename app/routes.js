import { Router } from 'express';
import multer from 'multer';

import MetaController from './controllers/meta.controller';
import AuthController from './controllers/auth.controller';
import UsersController from './controllers/users.controller';
import DistricController from './controllers/district.controller';
import AmenitieController from './controllers/amenitie.controller';
import StadiumController from './controllers/stadium.controller';
import CategoryController from './controllers/category.controller';
import LocationController from './controllers/location.controller';
import ChildStadiumController from './controllers/child-stadium.controller';
import SessionController from './controllers/session.controller';
import ReservationController from './controllers/reservation.controller';
import UploadController from './controllers/upload.controller';
import RateController from './controllers/rate.controller';

import errorHandler from './middleware/error-handler';

const routes = new Router();
// const storage = multer.diskStorage({ // Cấu hình multer
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });

const upload = multer({ dest: 'uploads/' });

routes.get('/', MetaController.index);

// Authentication
routes.post('/auth/login', AuthController.login);
// Users
routes.get('/users', UsersController.search);
routes.post('/user', UsersController.create);
routes.put('/user', UsersController.update);
routes.get('/user/:userId', UsersController.find);
routes.post('/user/login', UsersController.login);
// routes.get('/users/:username', UsersController._populate, UsersController.fetch);

// District
routes.get('/districts', DistricController.search);
routes.get('/district/:districtId', DistricController.find);
routes.post('/district', DistricController.create);
routes.put('/district', DistricController.update);
routes.delete('/district/:districtId', DistricController.delete);

// Category
routes.get('/categories', CategoryController.search);
routes.get('/category/:categoryId', CategoryController.find);
routes.post('/category', CategoryController.create);
routes.put('/category', CategoryController.update);
routes.delete('/category/:categoryId', CategoryController.delete);

// Stadium
routes.get('/stadiums', StadiumController.search);
routes.get('/stadium/:stadiumId', StadiumController.find);
routes.post('/stadium', StadiumController.create);
routes.put('/stadium', StadiumController.update);
routes.delete('/stadium/:stadiumId', StadiumController.delete);

// Amenitie
routes.get('/amenities', AmenitieController.search);
routes.get('/amenitie/:amenitieId', AmenitieController.find);
// routes.get('/amenities', AmenitieController.detail);
routes.post('/amenitie', AmenitieController.create);
routes.put('/amenitie', AmenitieController.update);
routes.delete('/amenitie/:amenitieId', AmenitieController.delete);

// Location
routes.get('/location/:locationId', LocationController.find);
routes.get('/locations', LocationController.search);
routes.post('/location', LocationController.create);
routes.put('/location', LocationController.update);
routes.delete('/location/:locationId', LocationController.delete);

// Child Stadium
routes.get('/child-stadiums/:stadiumId', ChildStadiumController.find);
routes.post('/child-stadium', ChildStadiumController.create);
routes.put('/child-stadium', ChildStadiumController.update);
routes.delete('/child-stadium/:childStadiumId', ChildStadiumController.delete);

// Session
routes.get('/sessions', SessionController.search);
routes.get('/all-sessions/:childStadiumId', SessionController.findByChildStadium);
routes.get('/session/:sessionId', SessionController.find);
routes.post('/session', SessionController.create);
routes.put('/session', SessionController.update);
routes.delete('/session/:sessionId', SessionController.delete);

// Reservation
routes.post('/reservation', ReservationController.create);
routes.get('/reservations', ReservationController.search);
routes.get('/reservation/:reservationId', ReservationController.find);
routes.put('/reservation', ReservationController.update);
routes.delete('/reservation/:reservationId', ReservationController.delete);
routes.put('/confirm-payed', ReservationController.confirmPayed);
routes.post('/delete-reservations', ReservationController.deletes);

// Rate
routes.post('/rate', RateController.create);
routes.get('/rates', RateController.search);
routes.get('/rate/:rateId', RateController.find);
routes.put('/rate', RateController.update);
routes.delete('/rate/:rateId', RateController.delete);

// Admin
routes.get('/admin', MetaController.index);

// Upload
// Xử dụng multer để xử lý form-data
// Tham khảo https://github.com/expressjs/multer
routes.post('/upload', upload.single('file'), UploadController.upload); // Chỉ cho phép upload từng file một. Tên trường phải là 'file'

routes.use(errorHandler);

export default routes;
