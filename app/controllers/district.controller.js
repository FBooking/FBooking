import BaseController from './base.controller';
import District from '../models/district';

class DistricController extends BaseController {

    /**
     * Tìm kiếm tất cả các District
    * @param {req} req Thông tin từ client gủi lên
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm các District thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm thành công trả về một mảng các object District
     */
    search = async (req, res, next) => {
        try {
            const districts =
                await District.find({});
            res.json(districts);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tìm kiếm một District theo id
    * @param {req} req Thông tin từ client gủi lên
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm District thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm thành công trả về một object District
     */
    find = async (req, res, next) => {
        try {
            const district = await District.findOne({ _id: req.params.districtId });
            res.json(district);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tạo một record District
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới District thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tạo mới District thành công trả về District đó kèm theo id
     */
    create = async (req, res, next) => {
        const { name, code } = req.body;
        const district = new District({
            name,
            code,
        });
        try {
            res.status(201).json(await district.save());
        } catch (err) {
            next(err);
        }
    }

    /**
     * Cập nhật thông tin một District theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi update District thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu cập nhật District thành công trả về District đó đã được cập nhật
     */
    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await District.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }

    /**
     * Xóa một District theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu xóa thành công trả về một object { n: số lượng record đã xóa, ok: Trạng thái xóa thành công hay thất bại}
     */
    delete = async (req, res, next) => {
        try {
            res.status(201).json(await District.remove({ _id: req.params.districtId }));
        } catch (err) {
            next(err);
        }
    }
}

export default new DistricController();
