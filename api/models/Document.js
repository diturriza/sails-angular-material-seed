/**
* Document.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type:'string',
      required: true,
      unique: true
    },
    url_title: {
      type:'sting'
    },
    url_title: {
      type:'sting'
    },
    inputs: {
      collection: 'input',
      via: 'documentThm'
    },
    labels: {
      collection: 'label',
      via: 'documentThm'
    },
    tables: {
      collection: 'table',
      via: 'documentThm'
    },
    supplies: {
      collection: 'supply',
      via: 'documentThm'
    }
  }
};
