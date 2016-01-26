/**
* Clinic.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableTitle: 'clinic',

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    shortname: {
      type: 'string',
      required: true,
      unique: true
    },
    clinicId: {
      type: 'string',
      required: true,
      unique: true
    },
    managers: {
      collection: 'user',
      via: 'clinics'
    },
    payload: {
      type: 'json'
    }
  }
};
