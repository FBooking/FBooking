import BaseController from './base.controller';
import User from '../models/user';

class AuthController extends BaseController {
  // login = async (req, res, next) => {
  //   const { username, password } = req.body;

  //   try {
  //     const user = await User.findOne({ username });

  //     if (!user || !user.authenticate(password)) {
  //       const err = new Error('Please verify your credentials.');
  //       err.status = 401;
  //       return next(err);
  //     }

  //     const token = user.generateToken();
  //     return res.status(200).json({ token });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  login = async (req, res, next) => {
    const { email, userId } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user || user.userId !== userId) {
        return res.status(201).json({ error: true, message: 'Sai thông tin đăng nhập.' });
      } else if (!user.isAdmin) {
        return res.status(201).json({ error: true, message: 'Tài khoản không có quyền truy cập trang này.' });
      }
      // const token = user.generateToken();
      return res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
