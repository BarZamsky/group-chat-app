const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = Schema({
    sentTo: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    channel: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Channel'
    },
});

messageSchema.pre('save', function (next) {
    this.sender = this.sender.toLowerCase();
    next()
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {Message};
