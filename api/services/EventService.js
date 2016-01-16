var _ = require('lodash');

module.exports = {
  getEventsByDay: getEventsByDay,
  getEventsTotals: getEventsTotals,
  cancelAppointment: cancelAppointment
}

/**
 * [getEventByDay description]
 * @method getEventByDay
 * @return {[type]}      [description]
 */
function getEventsByDay(cb) {
  console.log('events grouped by day');
  Event.native(function(err, collection) {
    if (err) return cb(err);

    collection.aggregate([{
      $group: {
        _id: "$dayCreated",
        count: {
          $sum: 1
        }
      }
    }], function(err, results) {
      if (err) return cb(err);
      var data = [];
      for (var i = 0; i < 7; i++) {
        data.push({
          _id: i,
          count: 0
        });
      }
      return cb(null, _.orderBy(_.unionBy(results, data,'_id'),['_id'],['asc']));
    });
  });
}

function cancelAppointment(appoinmentId, cb) {
  Event.findOne({
      appoinmentId: appoinmentId
    })
    .exec(function(err, eventToBeCancelled) {
      if (err) return cb(err);

      if (!eventToBeCancelled) {
        return cb({
          message: 'Object not found'
        });
      }
      Event.update({
        appoinmentId: eventToBeCancelled.appoinmentId
      },{
        status: 'cancelled'
      }, function(err, res) {
        if (err) {
          return cb(err);
        }

        return cb(null, res);
      });
    })
}

function getEventsTotals(cb) {
  console.log('count cancelled events');
  Event.native(function(err, collection) {
    if (err) return cb(err);

    collection.aggregate([{
      $group: {
        _id: "$status",
        count: {
          $sum: 1
        }
      }
    }], function(err, results) {
      if (err) return cb(err);
      var data = [
        {
          _id: 'booked',
          count: 0
        },
        {
          _id: 'cancelled',
          count: 0
        }
      ];
      console.log(results, data);
      return cb(null, _.unionBy(results, data, '_id'));
    });
  });
}
