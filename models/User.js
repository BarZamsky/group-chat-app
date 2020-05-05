const bcrypt = require('bcrypt');
const SALT = 10;
const mongoose = require('mongoose');

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

const UserSchema = mongoose.Schema({
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
        },
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

UserSchema.methods.toJSON = function () {
    const User = this;
    return User.toObject();
};

UserSchema.methods.generateHash = function generateHash (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT))
};

UserSchema.methods.validatePassword = function isValidPassword (password) {
    return bcrypt.compareSync(password, this.password)
};

UserSchema.methods.setAvatar = function (imageName, path) {
    const profile = this;
    profile.avatar = {
        imageName:imageName,
        imageData:path
    };
    return profile.save()
        .then(() => {
            return profile._doc;
        });
};

module.exports = mongoose.model('User', UserSchema);
