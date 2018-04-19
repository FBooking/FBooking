import BaseController from './base.controller';
import ChildStadium from '../models/childStadium';

class ChildStadiumController extends BaseController {

    search = async (req, res, next) => {
        try {
            const childStadiums =
                await ChildStadium.find({});
            res.json(childStadiums);
        } catch (err) {
            next(err);
        }
    }

    find = async (req, res, next) => {
        try {
            const childStadium = await ChildStadium.findOne({ stadiumId: req.params.stadiumId });
            res.json(childStadium);
        } catch (err) {
            next(err);
        }
    }

    create = async (req, res, next) => {
        const childStadium = new ChildStadium({
            ...req.body,
        });
        try {
            res.status(201).json(await childStadium.save());
        } catch (err) {
            next(err);
        }
    }

    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await ChildStadium.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }

    delete = async (req, res, next) => {
        try {
            res.status(201).json(await ChildStadium.remove({ _id: req.params.childStadiumId }));
        } catch (err) {
            next(err);
        }
    }
}

export default new ChildStadiumController();
