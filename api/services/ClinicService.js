var _ = require('lodash');

module.exports = {
  getClinics: getUserClinics
}

/**
 * [getClinics description]
 * @method getClinics
 * @param  {[type]}   userId [description]
 * @param  {[type]}   query  [description]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
 */
function getUserClinics(userId, query, cb) {
  User.findOne(userId).exec(function(err, user) {
    if (err) return cb(err);

    if (!user){
      return cb({
        err: 'User not found'
      });
    }
    
    if (user && user.isAdmin) {

      Clinic.find({}).paginate(query).exec(function(err, clinics) {
        if (err) return cb(err);

        Clinic.count({}).exec(function(err, total) {
          if (err) return cb(err);

          return cb(null, {
            res: clinics,
            count: total
          });
        });
      });
    }

    if (user && user.clinics) {
      Clinic.find({
          shortname: user.clinics
        })
        .paginate(query).exec(function(err, clinics) {
          if (err) return cb(err);

          Clinic.count({
            shortname: user.clinics
          }).exec(function(err, total) {
            if (err) return cb(err);

            return cb(null, {
              res: clinics,
              count: total
            });
          });
        });

    }
  });
}
