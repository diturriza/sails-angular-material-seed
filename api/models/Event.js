/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,

  tableName: 'events',

  attributes: {
    name: {
      type: 'string',
      required : true,
    },
    clinic: {
      type: 'string',
      defaultsTo: null
    },
    appoinmentDate : {
      type: 'string',
      defaultsTo: null
    },
    patient : {
      type: 'json',
      defaultsTo: {}
    },
    appointmentId: {
      type: 'string',
      unique: true
    },
    professional: {
      type: 'json',
      defaultsTo: {}
    },
    dayCreated: {
      type: 'integer',
      defaultsTo: 0
    },
    appoinmentInitDate: {
      type: 'string'
    },
    appoinmentEndDate: {
      type: 'string'
    },
    status: {
      type: 'string',
      defaultsTo: 'booked'
    },
    event: {
      type: 'json'
    },
    user: {
      type: 'json'
    },
    clinic: {
      type: 'json'
    },
    localization: {
      type: 'json'
    }
  },
  beforeCreate : function(values, cb){
    console.log(values);
    values['appointmentId'] = values.event.id;
    values['dayCreated'] = parseInt(values.dayCreated) || new Date().getDay();
    values['patient'] = values.event.patient;
    values['professional'] = values.event.professionnel;
    values['appoinmentDate'] = values.event['dateCréation'];
    values['appoinmentInitDate'] = values.event.dateDeb;
    values['appoinmentEndDate'] = values.event.dateFin;

    cb();
  }
};
