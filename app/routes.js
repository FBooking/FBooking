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

// Category
routes.get('/categorys', CategoryController.search);
routes.get('/category/:categoryId', CategoryController.find);
routes.post('/category', CategoryController.create);
routes.put('/category', CategoryController.update);

// Stadium
routes.get('/stadiums', StadiumController.search);
routes.get('/stadium/:stadiumId', StadiumController.find);
routes.post('/stadium', StadiumController.create);
routes.put('/amenitie', StadiumController.update);

// Amennitie
// routes.get('/amennities', AmenitieController.search);
routes.get('/amenitie/:amenitieId', AmenitieController.find);
routes.get('/amenities', AmenitieController.detail);
routes.post('/amenitie', AmenitieController.create);
routes.put('/amenitie', AmenitieController.update);

// Location
routes.get('/location/:locationId', LocationController.find);
routes.get('/locations', LocationController.search);
routes.post('/location', LocationController.create);
routes.put('/location', LocationController.update);

// Child Stadium
routes.get('/child-stadiums/:stadiumId', ChildStadiumController.find);
routes.post('/child-stadium', ChildStadiumController.create);
routes.put('/child-stadium', ChildStadiumController.update);

// Admin
routes.get('/admin', MetaController.index);

routes.use(errorHandler);

export default routes;
