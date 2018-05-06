import BaseController from './base.controller';
import Amenitie from '../models/amenitie';

class AmenitieController extends BaseController {

    /**
     * Tìm kiếm một Amenitie theo id
    * @param {req} req Thông tin từ client gủi lên
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm Amenitie thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm thành công trả về một object Amenitie
     */
    search = async (req, res, next) => {
        const { page, perPage, name } = req.query;
        const conditions = {};
        if (name) conditions.name = { $regex: name };
        try {
            const amenities = await Amenitie
                .find(conditions)
                .limit(parseInt(perPage, 10))
                .skip((parseInt(page, 10) - 1) * parseInt(perPage, 10));
            res.status(201).json(amenities);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tìm kiếm một Amenitie theo id
    * @param {req} req Thông tin từ client gủi lên
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm Amenitie thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm thành công trả về một object Amenitie
     */
    find = async (req, res, next) => {
        try {
            const amenitie = await Amenitie.findOne({ _id: req.params.amenitieId });
            res.status(201).json(amenitie);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tạo một record Amenitie
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới Amenitie thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tạo mới Amenitie thành công trả về Amenitie đó kèm theo id
     */
    create = async (req, res, next) => {
        const amenitie = new Amenitie({
            ...req.body,
        });
        try {
            res.status(201).json(await amenitie.save());
        } catch (err) {
            next(err);
        }
    }

    /**
     * Cập nhật thông tin một Amenitie theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi update Amenitie thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu cập nhật Amenitie thành công trả về Amenitie đó đã được cập nhật
     */
    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await Amenitie.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }

    //     /**
    //     * Tìm kiếm một Amenitie theo stadiumId
    //    * @param {req} req Thông tin từ client gủi lên
    //    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm Amenitie thành công.
    //    * @param {next} next Callback argument to the middleware function .
    //    * @return {void} Nếu tìm kiếm thành công trả về một object Amenitie
    //     */
    //     detail = async (req, res, next) => {
    //         const { stadiumId } = req.query;
    //         try {
    //             const amenitie =
    //                 await Amenitie.find({ stadiumId });
    //             res.json(amenitie);
    //         } catch (err) {
    //             next(err);
    //         }
    //     }

    /**
     * Xóa một Amenitie theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu xóa thành công trả về một object { n: số lượng record đã xóa, ok: Trạng thái xóa thành công hay thất bại}
     */
    delete = async (req, res, next) => {
        try {
            res.status(201).json(await Amenitie.remove({ _id: req.params.amenitieId }));
        } catch (err) {
            next(err);
        }
    }
}

export default new AmenitieController();
