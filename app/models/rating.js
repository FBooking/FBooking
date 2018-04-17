import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Rating = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stadiumId: {
        type: Schema.Types.ObjectId,
        ref: 'Stadium',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
}, {
        timestamps: true,
    });

const RatingModel = mongoose.model('Rating', Rating);

export default RatingModel;
