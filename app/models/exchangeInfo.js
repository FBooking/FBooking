import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ExchangeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stadiumId: {
        type: Schema.Types.ObjectId,
        ref: 'Stadium',
        required: true,
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: 'Session',
    },
    bankNumber: {
        type: Number,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    payed: {
        type: Boolean,
        default: false,
    },
}, {
        timestamps: true,
    });

const ExchangeModel = mongoose.model('Exchange', ExchangeSchema);

export default ExchangeModel;
