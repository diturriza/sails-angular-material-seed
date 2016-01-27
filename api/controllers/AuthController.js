/**
 * AuthController
 */


module.exports = {
  index: function(req, res){
    var email = req.body.email,
    password = req.body.password;

    if( !email || !password){
      return res.badRequest({
        err: 'email and password required'
      });
    }

    User.findOne({email: email}, function(err, user){
      if( !user){
        return res.badRequest({
          err: 'Invalid email/password combination'
        });
      }

      if (!user.activated){
        return res.forbidden({
          err: 'Account inactive, please contact the administration.'
        });
      }

      if (user.clinics && user.clinics.length === 0){
        return res.forbidden({
          err: 'No clinics associated to this account, please contact the administration.'
        });
      }

      User.comparePassword(password, user, function (err, valid){
        if (err){
          return res.json(403, {err: 'forbidden'});
        }

        if(!valid){
          return res.badRequest({
            err: 'Invalid email/password combination'
          });
        } else {
          res.ok({
            user: user,
            token: jwToken.issue({id: user.id})
          });
        }
      });
    });
  }
};
