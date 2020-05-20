const mongoose = require('mongoose'),
    errorCodes = require("../utils/ErrorCodes"),
    logger = require('../middleware/logger'),
    ObjectID = require('mongodb').ObjectID;

const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String
    },
    topic: {
        type: String
    },
    private: {
        type: Boolean,
        default: false
    },
    users: {
        type: [Schema.Types.ObjectId]
    }
});

ChannelSchema.pre('save', function (next) {
    this.name = this.name.toLowerCase();
    next()
});


ChannelSchema.methods.addUsers = function (users) {
    const channel = this;
    channel.users.push(users);
    return channel.save()
        .then(() => {
            return channel._doc;
        });
};

ChannelSchema.statics.getChannels = function (userId) {
    const channel = this;
    return channel.find({users: {$elemMatch:{$eq: userId }}})
        .then(channel => {
            return channel;
        })
        .catch(err => logger.log('error', err.message))
};

ChannelSchema.statics.findChannel = async function (name) {
    const Channel = this;
    const channel = await Channel.findOne({'name': name});
    if (!channel) {
        return {
            errorCode: errorCodes.CHANNEL_NOT_FOUND,
            data: 'channel not found for name '+name
        };
    }
    return {
        errorCode: 0,
        data: channel
    }
};

ChannelSchema.statics.getMembersList = async function (name) {
    const Channel = this;
    const channel = await Channel.findOne({'name': name});
    if (!channel) {
        return {
            errorCode: errorCodes.CHANNEL_NOT_FOUND,
            data: 'channel not found for name '+name
        };
    }

    return {
        errorCode: 0,
        data: channel._doc.users
    }
};

const Channel = mongoose.model('Channel', ChannelSchema);

module.exports = {Channel};
