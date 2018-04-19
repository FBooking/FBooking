import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StadiumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'CategoryStadium',
    },
    districtId: {
        type: Schema.Types.ObjectId,
        ref: 'Distric',
    },
    dealDate: String,
    description: String,
    thumbnail: [{ type: String }],
    isActive: {
        type: Boolean,
        default: false,
    },
}, {
        timestamps: true,
    });

const StadiumModel = mongoose.model('Stadium', StadiumSchema);

export default StadiumModel;
