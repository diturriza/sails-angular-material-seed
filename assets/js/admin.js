(function() {
  'use strict';

  var myApp = angular.module('myApp', ['ng-admin']);

  myApp.config(['NgAdminConfigurationProvider', function(nga) {
    // var nga = NgAdminConfigurationProvider;
    // create an admin application
    var admin = nga.application('Thirty Handmade Days Admin')
      .baseApiUrl('http://localhost:1337/');

    // Definicion de Entidades
    var user = nga.entity('user');
    var documents = nga.entity('document');
    var inputs = nga.entity('input');
    var labels = nga.entity('label');
    var supplies = nga.entity('supply');
    var tables = nga.entity('table');
    var tHead = nga.entity('thead');
    var tRow = nga.entity('trow');

    // Add Entities to Admin
    admin
      .addEntity(user)
      .addEntity(documents)
      .addEntity(inputs)
      .addEntity(labels)
      .addEntity(supplies)
      .addEntity(tables)
      .addEntity(tHead)
      .addEntity(tRow);


    // USER FIELD CONFIGURATION
    user.listView().fields([
      nga.field('name').isDetailLink(true),
      nga.field('username'),
      nga.field('email')
    ]);

    // DOCUMENT FIELD CONFIGURATION
    documents.listView().fields([
        nga.field('title'),
        nga.field('url_document'),
        nga.field('createdAt', 'date'),
        nga.field('updatedAt', 'date')
      ])
      .listActions(['show', 'edit'])
      .batchActions([]);
    documents.showView().fields([
      nga.field('title'),
      nga.field('url_document'),
      nga.field('url_title'),
      nga.field('inputs', 'referenced_list') // display list of related comments
      .targetEntity(nga.entity('input'))
      .targetReferenceField('documentThm')
      .targetFields([
        nga.field('type'),
        nga.field('name'),
        nga.field('style'),
        nga.field('disabled', 'boolean'),
        nga.field('value')
      ])
      .sortField('created_at')
      .sortDir('DESC'),
      nga.field('labels', 'referenced_list') // display list of related comments
      .targetEntity(nga.entity('label'))
      .targetReferenceField('documentThm')
      .targetFields([
        nga.field('name'),
        nga.field('style'),
        nga.field('disabled', 'boolean'),
        nga.field('value')
      ])
      .sortField('created_at')
      .sortDir('DESC'),
      nga.field('supplies', 'referenced_list') // display list of related comments
      .targetEntity(nga.entity('supply'))
      .targetReferenceField('documentThm')
      .targetFields([
        nga.field('text')
      ])
      .sortField('created_at')
      .sortDir('DESC')
    ]);
    documents.creationView().fields([
      nga.field('title'),
      nga.field('url_document'),
      nga.field('url_title')
    ]);
    documents.editionView().fields(documents.creationView().fields());

    // INPUTS FIELD CONFIGURATION
    inputs.listView().fields([
        nga.field('documentThm.id', 'reference')
        .isDetailLink(true)
        .label('Document')
        .targetEntity(documents)
        .targetField(nga.field('title'))
        .singleApiCall(function(id) {
          console.log(id);
          return id => ({
            'id': id
          });
        }),
        nga.field('type'),
        nga.field('name'),
        nga.field('style'),
        nga.field('disabled', 'boolean')
        .choices([{
          value: true,
          label: 'enabled'
        }, {
          value: false,
          label: 'disabled'
        }]),
        nga.field('value'),
        nga.field('createdAt', 'date'),
        nga.field('updatedAt', 'date')
      ])
      .sortField('documentThm.id')
      .listActions(['edit']);
    inputs.creationView().fields([
      nga.field('type'),
      nga.field('name'),
      nga.field('style'),
      nga.field('disabled', 'boolean')
      .choices([{
        value: false,
        label: 'Yes'
      }, {
        value: true,
        label: 'No'
      }])
      .label('Enabled?'),
      nga.field('value'),
      nga.field('documentThm.id', 'reference')
      .label('Document')
      .targetEntity(documents)
      .targetField(nga.field('title'))
      .sortField('title')
      .sortDir('ASC')
      .validation({
        required: true
      })
      .remoteComplete(true, {
        refreshDelay: 200,
        searchQuery: search => ({
          q: search
        })
      })
    ]);
    inputs.editionView().fields(inputs.creationView().fields());

    // LABELS FIELD CONFIGURATION
    labels.listView().fields([
        nga.field('documentThm.id', 'reference')
        .isDetailLink(true)
        .label('Document')
        .targetEntity(documents)
        .targetField(nga.field('title'))
        .singleApiCall(function(id) {
          console.log(id);
          return id => ({
            'id': id
          });
        }),
        nga.field('name'),
        nga.field('style'),
        nga.field('disabled', 'boolean')
        .choices([{
          value: true,
          label: 'enabled'
        }, {
          value: false,
          label: 'disabled'
        }]),
        nga.field('value'),
        nga.field('createdAt', 'date'),
        nga.field('updatedAt', 'date')
      ])
      .sortField('documentThm.id')
      .listActions(['edit']);
    labels.creationView().fields([
      nga.field('name'),
      nga.field('style'),
      nga.field('disabled', 'boolean')
      .choices([{
        value: false,
        label: 'Yes'
      }, {
        value: true,
        label: 'No'
      }])
      .label('Enabled?'),
      nga.field('value'),
      nga.field('documentThm.id', 'reference')
      .label('Document')
      .targetEntity(documents)
      .targetField(nga.field('title'))
      .sortField('title')
      .sortDir('ASC')
      .validation({
        required: true
      })
      .remoteComplete(true, {
        refreshDelay: 200,
        searchQuery: search => ({
          q: search
        })
      })
    ]);
    labels.editionView().fields(labels.creationView().fields());

    // SUPPLY FIELD CONFIGURATION
    supplies.listView().fields([
        nga.field('documentThm.id', 'reference')
        .isDetailLink(true)
        .label('Document')
        .targetEntity(documents)
        .targetField(nga.field('title'))
        .singleApiCall(function(id) {
          console.log(id);
          return id => ({
            'id': id
          });
        }),
        nga.field('text'),
        nga.field('createdAt', 'date'),
        nga.field('updatedAt', 'date')
      ])
      .sortField('documentThm.id')
      .listActions(['edit']);

    supplies.creationView().fields([
      nga.field('text'),
      nga.field('documentThm.id', 'reference')
      .label('Document')
      .targetEntity(documents)
      .targetField(nga.field('title'))
      .sortField('title')
      .sortDir('ASC')
      .validation({
        required: true
      })
      .remoteComplete(true, {
        refreshDelay: 200,
        searchQuery: search => ({
          q: search
        })
      })
    ]);
    supplies.editionView().fields(supplies.creationView().fields());

    // TABLES FIELD CONFIGURATION
    tables.listView().fields([
        nga.field('documentThm.id', 'reference')
        .isDetailLink(true)
        .label('Document')
        .targetEntity(documents)
        .targetField(nga.field('title'))
        .singleApiCall(function(id) {
          console.log(id);
          return id => ({
            'id': id
          });
        }),
        nga.field('name'),
        nga.field('createdAt', 'date'),
        nga.field('updatedAt', 'date')
      ])
      .sortField('documentThm.id')
      .listActions(['show', 'edit']);

    tables.showView().fields([
      nga.field('documentThm.id', 'reference')
      .isDetailLink(true)
      .label('Document')
      .targetEntity(documents)
      .targetField(nga.field('title'))
      .singleApiCall(function(id) {
        return id => ({
          'id': id
        });
      }),
      nga.field('name'),
      nga.field('tHead', 'referenced_list') // display list of related comments
      .targetEntity(nga.entity('thead'))
      .targetReferenceField('tableId')
      .targetFields([
        nga.field('numCol'),
        nga.field('text')
      ]),
      nga.field('tRow', 'referenced_list') // display list of related comments
      .targetEntity(nga.entity('trow'))
      .targetReferenceField('tableId')
      .targetFields([
        nga.field('numCol'),
        nga.field('numRow'),
        nga.field('text')
      ]),
      nga.field('createdAt', 'date'),
      nga.field('updatedAt', 'date')
    ]);

    tables.creationView().fields([
      nga.field('name'),
      nga.field('documentThm.id', 'reference')
      .label('Document')
      .targetEntity(documents)
      .targetField(nga.field('title'))
      .sortField('title')
      .sortDir('ASC')
      .validation({
        required: true
      })
      .remoteComplete(true, {
        refreshDelay: 200,
        searchQuery: search => ({
          q: search
        })
      })
    ]);

    tables.editionView().fields(tables.creationView().fields());

    // THEADS FIELD CONFIGURATION
    tHead.listView().fields([
        nga.field('tableId.id', 'reference')
        .isDetailLink(true)
        .label('Table')
        .targetEntity(tables)
        .targetField(nga.field('name'))
        .singleApiCall(function(id) {
          console.log(id);
          return id => ({
            'id': id
          });
        }),
        nga.field('numCol', 'number'),
        nga.field('text'),
        nga.field('createdAt', 'date'),
        nga.field('updatedAt', 'date')
      ])
      .sortField('documentThm.id')
      .listActions(['edit']);
    tHead.creationView().fields([
      nga.field('numCol', 'number'),
      nga.field('text'),
      nga.field('tableId.id', 'reference')
      .label('Table')
      .targetEntity(tables)
      .targetField(nga.field('name'))
      .sortField('name')
      .sortDir('ASC')
      .validation({
        required: true
      })
      .remoteComplete(true, {
        refreshDelay: 200,
        searchQuery: search => ({
          q: search
        })
      })
    ]);
    tHead.editionView().fields(tHead.creationView().fields());

    // TROWS FIELD CONFIGURATION
    tRow.listView().fields([
        nga.field('tableId.id', 'reference')
        .isDetailLink(true)
        .label('Table')
        .targetEntity(tables)
        .targetField(nga.field('name'))
        .singleApiCall(function(id) {
          console.log(id);
          return id => ({
            'id': id
          });
        }),
        nga.field('numCol', 'number'),
        nga.field('numRow', 'number'),
        nga.field('text'),
        nga.field('createdAt', 'date'),
        nga.field('updatedAt', 'date')
      ])
      .sortField('documentThm.id')
      .listActions(['edit']);
    tRow.creationView().fields([
      nga.field('numCol', 'number'),
      nga.field('numRow', 'number'),
      nga.field('text'),
      nga.field('tableId.id', 'reference')
      .label('Table')
      .targetEntity(tables)
      .targetField(nga.field('name'))
      .sortField('name')
      .sortDir('ASC')
      .validation({
        required: true
      })
      .remoteComplete(true, {
        refreshDelay: 200,
        searchQuery: search => ({
          q: search
        })
      })
    ]);
    tRow.editionView().fields(tRow.creationView().fields());


    nga.configure(admin);
  }]);

  myApp.config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
      if (operation == "getList") {
        // custom pagination params
        if (params._page) {
          params.limit = params._perPage;
          var start = (params._page - 1) * params._perPage;
          var end = params._page * params._perPage;
          params.skip = start;
        }
        delete params._page;
        delete params._perPage;
        // custom sort params
        if (params._sortField) {
          var sort = params._sortField;
          var order = params._sortDir;
          params.sort = sort + ' ' + order;
        }
        delete params._sortField;
        delete params._sortDir;
        // custom filters
        if (params._filters) {
          for (var filter in params._filters) {
            params[filter] = params._filters[filter];
          }
        }
        delete params._filters;
      }
      return {
        params: params
      };
    });

  }]);
}());
