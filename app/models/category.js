import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, {
        timestamps: true,
    });

const CategoryModel = mongoose.model('CategoryStadium', CategorySchema);

export default CategoryModel;
