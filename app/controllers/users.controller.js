import request from 'request';
import BaseController from './base.controller';
import User from '../models/user';

class UsersController extends BaseController {

  /**
   * Lấy thông tin của một người dùng Facebook với một mã token được Facebook cấp
   * Mặc định sẽ lấy 2 trường "name" và "id"
   * Có thể lấy thêm các trường khác. Tham khảo: https://developers.facebook.com/docs/graph-api/using-graph-api/#fieldexpansion
   * @param {req} req Thông tin từ client gủi lên. Yêu cầu trong body có thuộc tính "token" là mã token được Facebook cấp
   * @param {res} res Đối số được gọi để trả về kết quả cho client.
   * @param {next} next Callback argument to the middleware function .
   * @return {void} Nếu token chính xác hàm trả về một object thông tin người dùng Facebook
   */
  login = async (req, res, next) => {
    try {
      request(`https://graph.facebook.com/me?access_token=${req.body.token}`, (error, response, body) => {
        body = (body) ? JSON.parse(body) : { id: null };
        if (body.id) {
          return res.status(200).json({ body });
        } else {
          const err = new Error('Tài khoản không được phép đăng nhập.');
          err.status = 401;
          return next(err);
        }
      });
    } catch (err) {
      next(err);
    }
  }

  /**
 * Tìm kiếm một thành viên theo username của thành viên đó
 * @param {req} req Thông tin từ client gủi lên. Yêu cầu trong body có thuộc tính "username" là username của thành viên muốn tìm kiếm
 * @param {res} res Đối số được gọi để trả về kết quả tìm kiếm cho client.
 * @param {next} next Callback argument to the middleware function .
 * @return {void} Nếu kết quả tìm kiếm chính xác hàm trả về một object thông tin thành viên
 */
  find = async (req, res, next) => {
    try {
      const user = await User.findOne({ userId: req.params.userId });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Tìm kiếm tất cả các thành viên
   * @param {req} req Thông tin từ client gủi lên.
   * @param {res} res Đối số được gọi để trả về kết quả tìm kiếm cho client.
   * @param {next} next Callback argument to the middleware function .
   * @return {void} Nếu kết quả tìm kiếm chính xác hàm trả về một mảng thông tin các thành viên
   */
  search = async (req, res, next) => {
    try {
      res.json(await User.find());
    } catch (err) {
      next(err);
    }
  }

  /**
 * Tạo mới một thành viên
 * @param {req} req Thông tin từ client gủi lên.
 * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới thành viên thành công.
 * @param {next} next Callback argument to the middleware function .
 * @return {void} Nếu tạo mới thành viên thành công trả về một token
 */
  create = async (req, res, next) => {
    let newUser = new User({
      ...req.body,
    });

    try {
      const savedUser = await newUser.save();
      const token = savedUser.generateToken();
      res.status(201).json({ token });
    } catch (err) {
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
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
