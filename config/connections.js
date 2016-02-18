module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },
  /***************************************************************************
  *                                                                          *
  * MongoDB is the leading NoSQL database.                                   *
  * http://en.wikipedia.org/wiki/MongoDB                                     *
  *                                                                          *
  * Run: npm install sails-mongo                                             *
  *                                                                          *
  ***************************************************************************/
  localMongodb: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    // user: 'username',
    // password: 'password',
    database: 'thm_db'
  },

  developmentMongoLab: {
  adapter: 'sails-mongo',
  url: 'mongodb://devlccot:lccot1devadmin@ds011268.mongolab.com:11268/heroku_6c7h344f'
  // url: ' mongodb://devlccot:lccot1devadmin@ds011268.mongolab.com:11268/heroku_6c7h344f'
  },

  // productionMongoLab: {
  // adapter: 'sails-mongo',
  // url: 'mongodb://heroku_hhn2xlgb:aisi244h6umu30bese1r78q1r6@ds039125.mongolab.com:39125/heroku_hhn2xlgb'
  // },

};
