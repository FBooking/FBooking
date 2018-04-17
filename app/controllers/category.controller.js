import BaseController from './base.controller';
import Category from '../models/category';

class CategoryController extends BaseController {

    search = async (req, res, next) => {
        try {
            const category =
                await Category.find({});
            res.json(category);
        } catch (err) {
            next(err);
        }
    }

    find = async (req, res, next) => {
        try {
            const category = await Category.findOne({ _id: req.params.categoryId });
            res.json(category);
        } catch (err) {
            next(err);
        }
    }

    create = async (req, res, next) => {
        const { name, code } = req.body;
        const category = new Category({
            name,
            code,
        });
        try {
            res.status(201).json(await category.save());
        } catch (err) {
            next(err);
        }
    }

    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await Category.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }
}

export default new CategoryController();
