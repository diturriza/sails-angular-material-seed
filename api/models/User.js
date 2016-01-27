var bcrypt = require('bcrypt');

var User = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
      username: {
        type: 'string',
        unique: true
      },
      email: {
        type: 'string',
        required: true,
        unique: true
      },
      rvousId: {
        type: 'integer',
        required: true,
        unique: true
      },
      name: {
        type: 'string',
        defaultsTo: 'name'
      },
      lastname:{
        type: 'string',
        defaultsTo: 'lastname'
      },
      isAdmin: {
        type: 'boolean',
        defaultsTo: false
      },
      encryptedPassword: {
        type: 'string'
      },
      activated:{
        type:'boolean',
        defaultsTo: false
      },
      clinics:{
        type: 'array',
      },
      toJSON: function() {
        var obj = this.toObject();
        delete obj.encryptedPassword;
        return obj;
      }
    },

  // Here we encrypt password before creating a User
  beforeCreate: function(values, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) return next(err);
        values.encryptedPassword = hash;
        next();
      })
    })
  },
  comparePassword: function(password, user, cb) {
    bcrypt.compare(password, user.encryptedPassword, function(err, match) {
      if (err) cb(err);
      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};

module.exports = User;
