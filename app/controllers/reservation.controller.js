import BaseController from './base.controller';
import Reservation from '../models/reservation';
import Session from '../models/session';

class ReservationController extends BaseController {

    /**
     * Tìm kiếm tất cả các Reservation
    * @param {req} req Thông tin từ client gủi lên
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm Reservation thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm thành công trả về một mảng các object Reservation
     */
    search = async (req, res, next) => {
        const { page, perPage } = req.query;
        try {
            const populateQuery = [
                { path: 'userId' },
                { path: 'childStadiumId' },
                { path: 'sessionId' },
                {
                    path: 'childStadiumId',
                    populate: {
                        path: 'stadiumId',
                    },
                },
            ];
            const reservations =
                await Reservation
                    .find({})
                    .sort({ createdAt: -1 })
                    .populate(populateQuery)
                    .limit(parseInt(perPage, 10))
                    .skip((parseInt(page, 10) - 1) * parseInt(perPage, 10));
            res.status(201).json(reservations);
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
            const populateQuery = [
                { path: 'userId' },
                { path: 'childStadiumId' },
                { path: 'sessionId' },
                {
                    path: 'childStadiumId',
                    populate: {
                        path: 'stadiumId',
                    },
                },
            ];
            const reservation = await Reservation
                .findOne({ _id: req.params.reservationId })
                .populate(populateQuery);
            res.status(201).json(reservation);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Cập nhật thông tin thanh toán và thông tin của session tương ứng. Nếu xác nhận đã thanh toán sẽ set
     * giá trị isActive của session tương ứng thành false và ngược lại
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới Reservation thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tạo mới Reservation thành công trả về Reservation đó kèm theo id
     */
    confirmPayed = async (req, res, next) => {
        const { _id, payed } = req.body;
        try {
            const reservation = await Reservation.findByIdAndUpdate(_id, { payed }, { new: true });
            const session = await Session.findByIdAndUpdate(reservation.sessionId, { isActive: !payed }, { new: true });
            res.status(201).json({ reservation, session });
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
        const { userId, sessionId } = req.body;
        try {
            const reservation = await Reservation.findOne({
                userId, sessionId,
            });
            if (reservation) {
                return res.status(201).json({ message: 'Đơn hàng đã tồn tại.' });
            }
            const newReservation = new Reservation({
                ...req.body,
            });
            const result = await newReservation.save();
            res.status(201).json({ success: true, reservation: result });
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

    /**
     * Xóa nhiều bản ghi reservation theo 1 mảng các id
     *@param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới session thành công.
    * @param {next} next Callback argument to the middleware function .
     */
    deletes = async (req, res, next) => {
        const { ids } = req.body;
        try {
            const result = await Promise.all(ids.map(async (id) => {
                await Reservation.remove({ _id: id });
            }));
            res.status(201).json(result ? { success: true } : { success: false });
        } catch (err) {
            next(err);
        }
    }
}

export default new ReservationController();
