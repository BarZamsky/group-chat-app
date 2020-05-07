const bcrypt = require('bcryptjs');
const SALT = 10;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AvatarSchema = new mongoose.Schema({
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    }
});

const UserSchema = new Schema({
    displayName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    channels: [
        {
            type: String,
        }
    ],
    avatar: AvatarSchema,
    online: {
        type: Boolean,
        default: false,
    }
});

UserSchema.pre('save', function (next) {
    this.username = this.username.toLowerCase();
    next()
});

UserSchema.methods.generateHash = function (password) {
    const salt = bcrypt.genSaltSync(SALT);
    return bcrypt.hashSync(password, salt);
};

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

UserSchema.methods.setOnline = function () {
    const user = this;
    user.online = true;
    return user.save()
        .then(() => {
            return user._doc;
    });
};

UserSchema.methods.setAvatar = function (imageName, path) {
    const user = this;
    user.avatar = {
        imageName:imageName,
        imageData:path
    };
    return user.save()
        .then(() => {
            return user._doc;
        });
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
