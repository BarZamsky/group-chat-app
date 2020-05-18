const mongoose = require('mongoose'),
    errorCodes = require("../utils/ErrorCodes"),
    Schema = mongoose.Schema;

const ChannelSchema = Schema({
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

ChannelSchema.statics.getChannels = function (userId) {
    const channel = this;
    return channel.find({users: [userId] })
        .then(channel => {
            return channel;
        })
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
        data: channel._doc
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
