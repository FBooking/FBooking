import BaseController from './base.controller';
import Rating from '../models/rating';

class RateController extends BaseController {

    search = async (req, res, next) => {
        try {
            const rates =
                await Rating.find({});
            res.status(201).json(rates);
        } catch (err) {
            next(err);
        }
    }

    find = async (req, res, next) => {
        try {
            const rate = await Rating.findOne({ _id: req.params.rateId });
            res.status(201).json(rate);
        } catch (err) {
            next(err);
        }
    }

    create = async (req, res, next) => {
        const rate = new Rating({
            ...req.body,
        });
        try {
            res.status(201).json(await rate.save());
        } catch (err) {
            next(err);
        }
    }

    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await Rating.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }

    delete = async (req, res, next) => {
        try {
            res.status(201).json(await Rating.remove({ _id: req.params.rateId }));
        } catch (err) {
            next(err);
        }
    }
}

export default new RateController();
