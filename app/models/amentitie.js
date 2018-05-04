import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Amennitie = new Schema({
    stadiumId: {
        type: Schema.Types.ObjectId,
        ref: 'Stadium',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    thumbnail: [{
        uid: String,
        url: String,
        name: String,
        status: String,
        response: {
            status: String,
        },
    }],
    isActive: {
        type: Boolean,
        default: false,
    },
}, {
        timestamps: true,
    });

const AmennitieModel = mongoose.model('Amennitie', Amennitie);

export default AmennitieModel;
