import request from 'request';
import BaseController from './base.controller';
import User from '../models/user';

class UsersController extends BaseController {

  login = async (req, res, next) => {
    try {
      request(`https://graph.facebook.com/me?access_token=${req.body.token}`, (error, response, body) => {
        body = (body) ? JSON.parse(body) : { id: null };
        if (body.id) {
          return res.status(200).json({ body });
        } else {
          const err = new Error('Please verify your credentials.');
          err.status = 401;
          return next(err);
        }
      });
    } catch (err) {
      next(err);
    }
  }

  find = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  search = async (req, res, next) => {
    try {
      res.json(await User.find());
    } catch(err) {
      next(err);
    }
  }

  create = async (req, res, next) => {
    let newUser = new User({
      ...req.body,
    });

    try {
      const savedUser = await newUser.save();
      const token = savedUser.generateToken();
      res.status(201).json({ token });
    } catch(err) {
      err.status = 400;
      next(err);
    }
  }

  update = async (req, res, next) => {
    const { _id, ...otherParams } = req.body;
    try {
      res.status(201).json(await User.findByIdAndUpdate(_id, otherParams, { new: true }));
    } catch (err) {
      next(err);
    }
  }

  delete = async (req, res, next) => {
    if (!req.currentUser) {
      return res.sendStatus(403);
    }

    try {
      await req.currentUser.remove();
      res.sendStatus(204);
    } catch(err) {
      next(err);
    }
  }
}

export default new UsersController();
