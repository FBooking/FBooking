import BaseController from './base.controller';
import Location from '../models/location';

class LocationController extends BaseController {

    search = async (req, res, next) => {
        try {
            const locations =
                await Location.find({});
            res.status(201).json(locations);
        } catch (err) {
            next(err);
        }
    }

    find = async (req, res, next) => {
        try {
            const location = await Location.findOne({ _id: req.params.locationId });
            res.status(201).json(location);
        } catch (err) {
            next(err);
        }
    }

    create = async (req, res, next) => {
        const location = new Location({
            ...req.body,
        });
        try {
            res.status(201).json(await location.save());
        } catch (err) {
            next(err);
        }
    }

    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await Location.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }

    delete = async (req, res, next) => {
        try {
            res.status(201).json(await Location.remove({ _id: req.params.locationId }));
        } catch (err) {
            next(err);
        }
    }
}

export default new LocationController();
