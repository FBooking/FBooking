import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ChildStadiumSchema = new Schema({
    stadiumId: {
        type: Schema.Types.ObjectId,
        ref: 'Stadium',
        required: true,
    },
    numberOfS: {
        type: Number,
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

const ChildStadiumModel = mongoose.model('ChildStadium', ChildStadiumSchema);

export default ChildStadiumModel;
