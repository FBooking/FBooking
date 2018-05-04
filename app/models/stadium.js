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
    categoryId: [{
        type: Schema.Types.ObjectId,
        ref: 'CategoryStadium',
    }],
    districtId: {
        type: Schema.Types.ObjectId,
        ref: 'District',
    },
    location: {
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
    },
    // locationId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Location',
    //     required: true,
    // },
    dealDate: String,
    description: String,
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

const StadiumModel = mongoose.model('Stadium', StadiumSchema);

export default StadiumModel;
