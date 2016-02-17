var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function(NgAdminConfigurationProvider) {
  var nga = NgAdminConfigurationProvider;
  // create an admin application
  var admin = nga.application('My First Admin')
    .baseApiUrl('http://localhost:1337/');
  // more configuration here later
  // ...
  //
  // var user = nga.entity('user');
  //
  // user.listView().fields([
  //   nga.field('name'),
  //   nga.field('username'),
  //   nga.field('email')
  // ]);

  var documents = nga.entity('document');

  documents.listView().fields([
    nga.field('id'),
    nga.field('title'),
    nga.field('url_document'),
    nga.field('inputs'),
    nga.field('labels'),
    nga.field('supplies'),
    nga.field('tables'),
    nga.field('createdAt'),
    nga.field('updatedAt')
  ]);

  // admin.addEntity(user);
  admin.addEntity(documents);
  // attach the admin application to the DOM and run it
  nga.configure(admin);
}]);
