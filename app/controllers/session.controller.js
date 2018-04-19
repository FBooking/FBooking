import BaseController from './base.controller';
import Session from '../models/session';

class SessionController extends BaseController {

    /**
     * Tìm kiếm thông tin session theo các điều kiện
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm session thành công trả về một object thông tin session đó
     */
    search = async (req, res, next) => {
        const { page, perPage, date } = req.query; // eslint-disable-line TODO: Làm rõ yêu cầu
        const conditions = {};
        const defaultDate = '10/102018';
        if (date) conditions.createdAt = date;
        try {
            const category =
                await Session.find(conditions).limit(parseInt(perPage, 10)).skip((parseInt(page, 10) - 1) * parseInt(perPage, 10));
            res.json(category);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tìm kiếm thông tin chi tiết của một session
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm session thành công trả về một object thông tin session đó
     */
    find = async (req, res, next) => {
        try {
            const session = await Session.findOne({ _id: req.params.sessionId });
            res.json(session);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tạo một Session
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tạo mới session thành công trả về session đó kèm theo id
     */
    create = async (req, res, next) => {
        const session = new Session({
            ...req.body,
        });
        try {
            res.status(201).json(await session.save());
        } catch (err) {
            next(err);
        }
    }

    /**
     * Cập nhật thông tin một Session
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi cập nhật session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu cập nhật session thành công trả về session đó kèm theo id
     */
    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await Session.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }

    /**
     * Xóa một Session theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu xóa thành công trả về một object { n: số lượng record đã xóa, ok: Trạng thái xóa thành công hay thất bại}
     */
    delete = async (req, res, next) => {
        try {
            res.status(201).json(await Session.remove({ _id: req.params.sessionId }));
        } catch (err) {
            next(err);
        }
    }
}

export default new SessionController();
