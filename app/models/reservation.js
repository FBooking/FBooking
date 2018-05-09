import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Reservation = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    childStadiumId: {
        type: Schema.Types.ObjectId,
        ref: 'ChildStadium',
        required: true,
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: 'Session',
    },
    date: {
        type: String,
        required: true,
    },
    isChecked: {
        type: Boolean,
        default: false,
    },
}, {
        timestamps: true,
    });

const ReservationModel = mongoose.model('Reservation', Reservation);

export default ReservationModel;
