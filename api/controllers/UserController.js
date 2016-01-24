/**
 * UserController.js
 *
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').actions.user({

  index: function(req, res){
    User.find({})
    .populate('auth')
    .paginate({page: req.query.page || 1, limit: req.query.limit || 5}).exec(function(err, data){
        User.count({}, function(err, count){
          if (err) res.serverError(err);
          return res.ok({
            data: data,
            count : count
          });
        });
    });
  },

  lock: function(req, res){
      return res.ok('this a jwt action');
  },
  register: function(req, res) {
    var params = req.body,
      auth = {
        email: params.email,
        password: params.password
      };

    var attr = {
      email: params.email,
      name: params.name,
      lastname: params.lastname,
      password: params.password
    }
    console.log('user registration');
    console.log(attr);

    User.create(attr)
    .exec(function(err, user){
      if (err)
          return res.badRequest(err);
      
      waterlock.engine.attachAuthToUser(attr, user, function(err, user) {
        if (err){
          waterlock.logger.debug(err);
          return res.badRequest(err);
        }

        return res.ok(user);
      });

    });

  }
});
