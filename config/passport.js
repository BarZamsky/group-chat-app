'use strict'

const Strategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
    passport.serializeUser(function(user, cb) {cb(null, user.username);});

    passport.deserializeUser((user, cb) => cb(null, user));

    passport.use('local-signup', new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        (req, username, password, cb) => {
            User.findOne(
                { 'username': username.toLowerCase() },
                (err, user) => {
                    if (err) { return cb(err) }
                    if (user) { return cb(null, false) }
                    const newUser = new User({
                        username: username.toLowerCase(),
                        channels: ['general']
                    });
                    newUser.password = newUser.generateHash(password);

                    newUser.save((err, user) => {
                        if (err) {
                            throw err
                        }
                        return cb(null, newUser)
                    })
                }
            )
        }
    ));

    passport.use('local-login', new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        (req, username, password, cb) => {
            User.findOne(
                { 'username': username.toLowerCase() },
                (err, user) => {
                    if (err) {return cb(err)}
                    if (!user) {return cb(null, false)}

                    if (!user.validatePassword(password)) {
                        return cb(null, false)
                    }
                    return cb(null, user)
                }
            )
        }
    ))
};
