const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    userid: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    spouse: {
        name: {
            type: String,
        },
        dob: {
            type: Date,
        },
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    children: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }
});

module.exports = mongoose.model('Member', MemberSchema);