import BaseController from './base.controller';
import Stadium from '../models/stadium';

class StadiumController extends BaseController {

    search = async (req, res, next) => {
        const { page, perPage, districtId, categoryId } = req.query;
        const conditions = {};
        if (districtId) conditions.districtId = districtId;
        if (categoryId) conditions.categoryId = categoryId;
        try {
            const stadium =
                await Stadium.find(conditions).limit(parseInt(perPage, 10)).skip((parseInt(page, 10) - 1) * parseInt(perPage, 10));
            res.json(stadium);
        } catch (err) {
            next(err);
        }
    }

    find = async (req, res, next) => {
        try {
            const stadium = await Stadium.findOne({ _id: req.params.stadiumId });
            res.json(stadium);
        } catch (err) {
            next(err);
        }
    }

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

    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await Stadium.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }
}

export default new StadiumController();
