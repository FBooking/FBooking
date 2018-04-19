import BaseController from './base.controller';
import Reservation from '../models/reservation';

class ReservationController extends BaseController {

    /**
     * Tìm kiếm tất cả các Reservation
    * @param {req} req Thông tin từ client gủi lên
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm Reservation thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm thành công trả về một mảng các object Reservation
     */
    search = async (req, res, next) => {
        try {
            const reservation =
                await Reservation.find({});
            res.status(201).json(reservation);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tìm kiếm một Reservation theo id
    * @param {req} req Thông tin từ client gủi lên
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm Reservation thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm thành công trả về một object Reservation
     */
    find = async (req, res, next) => {
        try {
            const reservation = await Reservation.findOne({ _id: req.params.reservationId });
            res.status(201).json(reservation);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tạo một record Reservation
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới Reservation thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tạo mới Reservation thành công trả về Reservation đó kèm theo id
     */
    create = async (req, res, next) => {
        const reservation = new Reservation({
            ...req.body,
        });
        try {
            res.status(201).json(await reservation.save());
        } catch (err) {
            next(err);
        }
    }

    /**
     * Cập nhật thông tin một Reservation theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi update Reservation thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu cập nhật Reservation thành công trả về Reservation đó đã được cập nhật
     */
    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await Reservation.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }

    /**
     * Xóa một Reservation theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu xóa thành công trả về một object { n: số lượng record đã xóa, ok: Trạng thái xóa thành công hay thất bại}
     */
    delete = async (req, res, next) => {
        try {
            res.status(201).json(await Reservation.remove({ _id: req.params.reservationId }));
        } catch (err) {
            next(err);
        }
    }
}

export default new ReservationController();
