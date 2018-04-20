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
    stadiumId: {
        type: Schema.Types.ObjectId,
        ref: 'Stadium',
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
