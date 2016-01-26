var _ = require('lodash');

module.exports = {
  getEventsByDay: getEventsByDay,
  getEventsTotals: getEventsTotals,
  cancelAppointment: cancelAppointment,
  logEvent: logEvent
}

/**
 * [getEventByDay description]
 * @method getEventByDay
 * @return {[type]}      [description]
 */
function getEventsByDay(clinicId, cb) {
  Event.native(function(err, collection) {
    if (err) return cb(err);

    var criteria = [{
      $group: {
        _id: "$dayCreated",
        count: {
          $sum: 1
        }
      }
    }];

    if (clinicId != 'all') {
      criteria = [
        {$match: {
          clinicId: clinicId
        }},
        {$group: {
          _id: "$dayCreated",
          count: {
            $sum: 1
          }
        }}];
    }

    collection.aggregate(criteria, function(err, results) {
      if (err) return cb(err);
      var data = [];
      for (var i = 0; i < 7; i++) {
        data.push({
          _id: i,
          count: 0
        });
      }
      return cb(null, _.orderBy(_.unionBy(results, data, '_id'), ['_id'], ['asc']));
    });
  });
}

function cancelAppointment(appointmentId, cb) {
  Event.findOne({
      appointmentId: appointmentId
    })
    .exec(function(err, eventToBeCancelled) {
      if (err) return cb(err);

      if (!eventToBeCancelled) {
        return cb({
          message: 'Object not found'
        });
      }
      Event.update({
        appointmentId: eventToBeCancelled.appointmentId
      }, {
        status: 'cancelled'
      }, function(err, res) {
        if (err) {
          return cb(err);
        }

        return cb(null, res);
      });
    })
}

function getEventsTotals(clinicId, cb) {
  Event.native(function(err, collection) {
    if (err) return cb(err);
    var criteria = [{
      $group: {
        _id: "$status",
        count: {
          $sum: 1
        }
      }
    }];

    if (clinicId != 'all') {
      criteria = [
        {$match: {
          clinicId: clinicId
        }},
        {$group: {
          _id: "$status",
          count: {
            $sum: 1
          }
        }}];
    }

    collection.aggregate(criteria, function(err, results) {
      if (err) return cb(err);
      var data = [{
        _id: 'booked',
        count: 0
      }, {
        _id: 'cancelled',
        count: 0
      }];
      return cb(null, _.unionBy(results, data, '_id'));
    });
  });
}

/**
 * [logEvent description]
 * @method logEvent
 * @param  {[type]}   data [description]
 * @param  {Function} cb   [description]
 * @return {[type]}        [description]
 */
function logEvent(data, cb) {
  Event.findOne({
    appointmentId: data.event.id
  }, function(err, obj) {
    if (err) {
      return cb(err);
    }

    //if the event exists
    if (obj) {
      console.log('exitss');
      return cb(null, obj);
    }
    console.log('not exitss');

    Event.create(data, function(err, obj) {
      if (err) {
        return cb(err);
      }
      return cb(null, obj)
    });

  });
}
