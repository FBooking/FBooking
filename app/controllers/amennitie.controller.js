import BaseController from './base.controller';
import Amenitie from '../models/amentitie';

class AmentitieController extends BaseController {

    search = async (req, res, next) => {
        try {
            const amenities =
                await Amenitie.find({});
            res.json(amenities);
        } catch (err) {
            next(err);
        }
    }

    find = async (req, res, next) => {
        try {
            const amenitie = await Amenitie.findOne({ _id: req.params.amenitieId });
            res.json(amenitie);
        } catch (err) {
            next(err);
        }
    }

    create = async (req, res, next) => {
        const amentitie = new Amenitie({
            ...req.body,
        });
        try {
            res.status(201).json(await amentitie.save());
        } catch (err) {
            next(err);
        }
    }

    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await Amenitie.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }

    detail = async (req, res, next) => {
        const { stadiumId } = req.query;
        try {
            const amenitie =
                await Amenitie.find({ stadiumId });
            res.json(amenitie);
        } catch (err) {
            next(err);
        }
    }
}

export default new AmentitieController();
