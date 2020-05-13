const bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    validator = require('validator'),
    mongoose = require('mongoose'),
    errorCodes = require('../utils/ErrorCodes'),
    SALT = 10;

const Schema = mongoose.Schema;

const UserSubSchema = new mongoose.Schema({
    access: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    _id: false
});

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
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
    },
    avatar: AvatarSchema,
    online: {
        type: Boolean,
        default: false,
    },
    tokens: [UserSubSchema]
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = user.generateHash(user.password);
        next();
    } else {
        next();
    }
});

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    //TODO: Replace the '' to process.env.JWT_SECRET
    const token = jwt.sign({_id: user._id.toHexString(), access}, "SECRET_KEY").toString();
    user.tokens.push({access, token});

    return user.save()
        .then(() => {
            return token;
        });
};

UserSchema.methods.removeToken = function (token) {
    const user = this;
    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

// TODO: get secret key from env variables
UserSchema.statics.findByToken = async function (token) {
    const User = this;
    return await jwt.verify(token, "SECRET_KEY", async (err, decoded) => {
        if(err) {
            return {
                errorCode: errorCodes.INVALID_TOKEN,
                message: err.message
            }
        }

        const user = await User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });

        if (!user) {
            return {
                errorCode: errorCodes.USER_NOT_FOUND,
                data: 'User not found'
            };
        }

        user._doc['password'] = '';
        return {
            errorCode: 0,
            data: user._doc
        }
    });
};

UserSchema.statics.findByCredentials = function (username, password) {
    const User = this;
    return User.findOne({username})
        .then(user => {
            if (!user) {
                return Promise.reject({
                    errorCode: errorCodes.USER_NOT_FOUND,
                    error: true,
                    msg: 'User not found'
                });
            }

            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) {
                        reject({
                            errorCode: errorCodes.GENERAL_ERROR,
                            data: 'Login failed'
                        })
                    } else if (!res) {
                        resolve({
                            errorCode: errorCodes.GENERAL_ERROR,
                            data: 'Wrong password'
                        })
                    } else
                        resolve({
                            errorCode: 0,
                            data: user
                        })
                });
            });
        });
};

UserSchema.statics.getUsers = function (id) {
    const User = this;
    return User.find({_id: { $ne: id}}, {displayName:1})
        .then(users => {
            return users
        });
};


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
