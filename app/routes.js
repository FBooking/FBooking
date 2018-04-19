import { Router } from 'express';

import MetaController from './controllers/meta.controller';
import AuthController from './controllers/auth.controller';
import UsersController from './controllers/users.controller';
import DistricController from './controllers/district.controller';
import AmenitieController from './controllers/amennitie.controller';
import StadiumController from './controllers/stadium.controller';
import CategoryController from './controllers/category.controller';
import LocationController from './controllers/location.controller';
import ChildStadiumController from './controllers/child-stadium.controller';
import SessionController from './controllers/session.controller';
import ReservationController from './controllers/reservation.controller';

import errorHandler from './middleware/error-handler';

const routes = new Router();

routes.get('/', MetaController.index);

// Authentication
routes.post('/auth/login', AuthController.login);

// Users
routes.get('/users', UsersController.search);
routes.post('/user', UsersController.create);
routes.put('/user', UsersController.update);
routes.get('/user/:username', UsersController.find);
routes.post('/user/login', UsersController.login);
// routes.get('/users/:username', UsersController._populate, UsersController.fetch);

// District
routes.get('/districts', DistricController.search);
routes.get('/district/:districtId', DistricController.find);
routes.post('/district', DistricController.create);
routes.put('/district', DistricController.update);
routes.delete('/district', DistricController.delete);

// Category
routes.get('/categorys', CategoryController.search);
routes.get('/category/:categoryId', CategoryController.find);
routes.post('/category', CategoryController.create);
routes.put('/category', CategoryController.update);
routes.delete('/category', CategoryController.delete);

// Stadium
routes.get('/stadiums', StadiumController.search);
routes.get('/stadium/:stadiumId', StadiumController.find);
routes.post('/stadium', StadiumController.create);
routes.put('/stadium', StadiumController.update);
routes.delete('/stadium/:stadiumId', StadiumController.delete);

// Amenitie
// routes.get('/amennities', AmenitieController.search);
routes.get('/amenitie/:amenitieId', AmenitieController.find);
routes.get('/amenities', AmenitieController.detail);
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
routes.delete('/child-stadium/:childStadiumId', SessionController.delete);

// Session
routes.get('/sessions', SessionController.search);
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

// Admin
routes.get('/admin', MetaController.index);

routes.use(errorHandler);

export default routes;
