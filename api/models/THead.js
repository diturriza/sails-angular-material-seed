/**
* THead.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    numCol:{
      type:'integer',
      min:0,
      required:true
    },
    text:{
      type:'string'
    }
  }
};
