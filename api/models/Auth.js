/**
 * Auth
 *
 * @module      :: Model
 * @description :: Holds all authentication methods for a User
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.auth.attributes({

    /* e.g.
    nickname: 'string'
    */
    name: {
      type: 'string',
      required: true,
      defaultsTo: 'user-firstname'
    },
    lastname : {
      type: 'string',
      required: true,
      defaultsTo: 'user-lastname'
    },
    isAdmin: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    clinic: {
      model: 'clinic'
    }

  }),

  beforeCreate: require('waterlock').models.auth.beforeCreate,
  beforeUpdate: require('waterlock').models.auth.beforeUpdate
};
