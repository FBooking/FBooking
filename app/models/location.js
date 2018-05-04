import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Location = new Schema({
    // stadiumId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Stadium',
    //     required: true,
    // },
    latitude: {
        type: String,
        required: true,
    },
    longtitude: {
        type: String,
        required: true,
    },
    latitudeDelta: {
        type: String,
    },
    longtitudeDelta: {
        type: String,
    },
}, {
        timestamps: true,
    });

const LocationModel = mongoose.model('Location', Location);

export default LocationModel;
