import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: String,
}, {
        timestamps: true,
    });

const DistrictModel = mongoose.model('District', DistrictSchema);

export default DistrictModel;
