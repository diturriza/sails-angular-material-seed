/**
* Table.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name:{
      type:'string',
      required:true
    },
    th: {
      collection:'tHead',
      via: 'tableId'
    },
    tr: {
      collection:'tRow',
      via: 'tableId'
    },
    documentThm :{
      model: 'document'
    }
  }
};
