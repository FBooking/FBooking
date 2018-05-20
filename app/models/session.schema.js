import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    name: {
        type: String,
    },
    startedAt: {
        type: Date,
        required: true,
    },
    finishedAt: {
        type: Date,
        required: true,
    },
    childStadiumId: {
        type: Schema.Types.ObjectId,
        ref: 'ChildStadium',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, {
        timestamps: true,
    });

const SessionModel = mongoose.model('Session', SessionSchema);

export default SessionModel;
