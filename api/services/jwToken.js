/**
 * jwToken implementation
 * 24/01/2015
 */


var
  jwt = require('jsonwebtoken'),
  tokenSecret = 'this is secret';

module.exports = {
  issue: issue,
  verify: verify
};

/**
 * [issue description]
 * @method issue
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
function issue(payload) {
  return jwt.sign(
    payload,
    tokenSecret,{
      expiresIn: '1h'
    }
  );
}

/**
 * [verify description]
 * @method verify
 * @param  {[type]}   token [description]
 * @param  {Function} cb    [description]
 * @return {[type]}         [description]
 */
function verify(token, cb){
  return jwt.verify(
    token,
    tokenSecret,
    {}, //no options
    cb// pass error or decoded token
  );
}
