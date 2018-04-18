import BaseController from './base.controller';
import District from '../models/district';

class DistricController extends BaseController {

    search = async (req, res, next) => {
        try {
            const districts =
                await District.find({});
            res.json(districts);
        } catch (err) {
            next(err);
        }
    }

    find = async (req, res, next) => {
        try {
            const district = await District.findOne({ _id: req.params.districtId });
            res.json(district);
        } catch (err) {
            next(err);
        }
    }

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

    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await District.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }
}

export default new DistricController();
