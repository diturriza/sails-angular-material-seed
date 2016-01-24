/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.user.attributes({

    /* e.g.
    nickname: 'string'
    */
    email: {
      type: 'string',
      required: true
    },
    
    clinics :{
      collection: 'Clinic',
      via: 'managers',
      dominant: true
    }

  }),

  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
