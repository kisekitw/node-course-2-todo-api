const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            // validator: (value) => {
            //     return validator.isEmail(value);
            // },
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email.`
        }
    },
    password: {
        type: String, 
        required: true, 
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }] 
});

// 控制回傳的json內容
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({access, _id: user._id.toHexString()}, 'abc123').toString();
  
  user.tokens.push({
      access, token
  });

  return user.save().then(() => {
      return token;
  });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (error) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });

        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });         
        });
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};