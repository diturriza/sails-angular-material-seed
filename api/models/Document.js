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
    inputs: {
      collection: 'input'
    },
    labels: {
      collection: 'label'
    },
    tables: {
      collection: 'table'
    },
    supplies: {
      collection: 'supply'
    }
  }
};
