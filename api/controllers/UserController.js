/**
 * UserController.js
 *
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  index: function(req, res){

    if(req.isSocket){
      // subscribe client to model changes
			User.watch(req.socket);
      return res.ok({
        message: 'User subscribed to User Changes ' + req.socket.id
      })
    };

    User.find({})
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
  create: function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.badRequest({err: 'Password doesn\'t match, What a shame!'});
    }
    User.findOrCreate({email: req.body.email}, req.body).exec(function (err, user) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If user created successfuly we return user and token as response
      if (user) {
        User.publishCreate(user);
        // NOTE: payload is { id: user.id}
        res.ok({user: user, token: jwToken.issue({id: user.id})});
      }
    });
  },
  activate: function (req, res){
    if (!req.body.userId) {
      return res.json(401, {err: 'UserId is required'});
    }
    User.findOne({id: req.body.userId}).exec(function (err, user) {
        if (err){
          return res.serverError(err);
        }
        User.update({id: user.id},{
          activated: user.activated?false:true
        }, function(err, resp){
          if (err){
            return res.serverError(err);
          }
          return res.ok(resp[0]);
        })
    });
  },
  makeAdmin: function (req, res){
    if (!req.body.userId) {
      return res.ok({err: 'UserId is required'});
    }
    User.findOne({id: req.body.userId}).exec(function (err, user) {
        if (err){
          return res.serverError(err);
        }

        if(!user){
          return res.notFound({err: 'User not found'});
        }


        User.update({id: user.id},{
          isAdmin: user.isAdmin?false:true
        }, function(err, resp){
          if (err){
            return res.serverError(err);
          }
          return res.ok(resp[0]);
        })
    });
  },
  changeScope: function(req, res){
    if (!req.body.rvousId) {
      return res.badRequest({err: 'rvousId is required'});
    }

    console.log('changing user scope');

    User.findOne({rvousId: req.body.rvousId}).exec(function (err, user) {
        if (err){
          return res.serverError(err);
        }

        if(!user){
          return res.notFound({err: 'User not found'});
        }

        User.update({id: user.id},{
          username : req.body.username,
          email: req.body.email,
          clinics: req.body.clinics
        }, function(err, resp){
          if (err){
            return res.serverError(err);
          }
          return res.ok(resp[0]);
        })
    });
  },
  banUser: function(req, res){
    if (!req.body.rvousId) {
      return res.badRequest({err: 'rvousId is required'});
    }

    console.log('banning user');

    User.findOne({rvousId: req.body.rvousId}).exec(function (err, user) {
        if (err){
          return res.serverError(err);
        }

        if(!user){
          return res.notFound({err: 'User not found'});
        }

        User.update({id: user.id},{
          activated: user.activated?false:true
        }, function(err, resp){
          if (err){
            return res.serverError(err);
          }
          return res.ok(resp[0]);
        })
    });
  }
}
