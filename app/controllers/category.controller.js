import BaseController from './base.controller';
import Category from '../models/category';

class CategoryController extends BaseController {

    /**
     * Tìm kiếm tất cả các Category
    * @param {req} req Thông tin từ client gủi lên
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm các Category thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm thành công trả về một mảng các object Category
     */
    search = async (req, res, next) => {
        const { page, perPage } = req.query;
        try {
            const categories =
                await Category
                    .find({})
                    .limit(parseInt(perPage, 10))
                    .skip((parseInt(page, 10) - 1) * parseInt(perPage, 10));
            res.status(201).json(categories);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tìm kiếm thông một Category theo id
    * @param {req} req Thông tin từ client gủi lên
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm Category thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm thành công trả về một object Category
     */
    find = async (req, res, next) => {
        try {
            const category = await Category.findOne({ _id: req.params.categoryId });
            res.status(201).json(category);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tạo một record Category
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới Category thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tạo mới Category thành công trả về Category đó kèm theo id
     */
    create = async (req, res, next) => {
        const { name, isActive } = req.body;
        const category = new Category({
            name,
            isActive,
        });
        try {
            res.status(201).json(await category.save());
        } catch (err) {
            next(err);
        }
    }

    /**
     * Cập nhật thông tin một Category theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi update Category thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu cập nhật Category thành công trả về Category đó đã được cập nhật
     */
    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await Category.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }

    /**
     * Xóa một Category theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau xóa thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu xóa thành công trả về một object { n: số lượng record đã xóa, ok: Trạng thái xóa thành công hay thất bại}
     */
    delete = async (req, res, next) => {
        try {
            res.status(201).json(await Category.remove({ _id: req.params.categoryId }));
        } catch (err) {
            next(err);
        }
    }
}

export default new CategoryController();
