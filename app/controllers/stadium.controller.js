import BaseController from './base.controller';
import Stadium from '../models/stadium';
import ChildStadium from '../models/childStadium';
import Rating from '../models/rating';

class StadiumController extends BaseController {

    /**
    * Tìm kiếm thông tin sân theo các điều kiện
    * @param {req} req Thông tin từ client gủi lên. Trong tham số này có chứa các query: page, perPage, districtId, categoryId, name
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm sân thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm thành công trả về một mảng các object stadium
     */
    search = async (req, res, next) => {
        const { page, perPage, districtId, categoryId, name } = req.query;
        const conditions = {};
        if (districtId) conditions.districtId = districtId;
        if (categoryId) conditions.categoryId = categoryId;
        if (name) conditions.name = { $regex: name };
        try {
            const populateQuery = [
                { path: 'categoryIds' },
                { path: 'districtId' },
                { path: 'amenitieIds' },
            ];
            const stadiums = await Stadium
                .find(conditions)
                .populate(populateQuery)
                .limit(parseInt(perPage, 10))
                .skip((parseInt(page, 10) - 1) * parseInt(perPage, 10));

            const result = await Promise.all(stadiums.map(async (stadium) => {
                const { _id } = stadium;
                const childStadiums = await ChildStadium.find({ stadiumId: _id });
                const rates = await Rating.find({ stadiumId: _id });
                const newStadium = JSON.parse(JSON.stringify(stadium));
                newStadium.childStadiums = childStadiums;
                newStadium.rates = rates;
                return newStadium;
            }));

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tìm kiếm thông một sân theo id
    * @param {req} req Thông tin từ client gủi lên
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm sân thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm thành công trả về một object stadium
     */
    find = async (req, res, next) => {
        try {
            const populateQuery = [
                { path: 'categoryIds' },
                { path: 'districtId' },
                { path: 'amenitieIds' },
            ];
            const stadium = await Stadium
                .findOne({ _id: req.params.stadiumId })
                .populate(populateQuery);
            const { _id } = stadium;
            const [childStadiums, rates] = await Promise.all([
                ChildStadium.find({ stadiumId: _id }),
                Rating.find({ stadiumId: _id }),
            ]);
            const newStadium = JSON.parse(JSON.stringify(stadium));
            newStadium.childStadiums = childStadiums;
            newStadium.rates = rates;
            res.status(201).json(newStadium);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tạo một record Stadium
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tạo mới Stadium thành công trả về Stadium đó kèm theo id
     */
    create = async (req, res, next) => {
        const stadium = new Stadium({
            ...req.body,
        });
        try {
            res.status(201).json(await stadium.save());
        } catch (err) {
            next(err);
        }
    }

    /**
     * Cập nhật thông tin một Stadium theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu cập nhật Stadium thành công trả về Stadium đó đã được cập nhật
     */
    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await Stadium.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }

    /**
     * Xóa một Stadium theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu xóa thành công trả về một object { n: số lượng record đã xóa, ok: Trạng thái xóa thành công hay thất bại}
     */
    delete = async (req, res, next) => {
        try {
            res.status(201).json(await Stadium.remove({ _id: req.params.stadiumId }));
        } catch (err) {
            next(err);
        }
    }
}

export default new StadiumController();
