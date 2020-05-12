const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

ChannelSchema.statics.createChannel = function (data) {
    const channel = this;
    channel.name = data.name;
    channel.users = data.users;
    if (data.description)
        channel.description = data.description;
    if (data.topic)
        channel.topic = data.topic;
    if (data.private)
        channel.private = data.private;

    return channel.save()
        .then(() => {
            return channel._doc;
        })
};

const Channel = mongoose.model('Channel', ChannelSchema);

module.exports = {Channel};
