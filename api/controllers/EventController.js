/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  restricted: function(req, res){
    return res.ok('you are authenticated');
  },
  open: function(req, res){
    return res.ok('this is an open action');
  },
  jwt: function(req,res){
    return res.ok('this a jwt action');
  },

  index: function(req, res){
    Event.find({})
    .paginate({page: req.query.page || 1, limit: req.query.limit || 5})
    .sort(req.query.order || 'createdAt DESC')
    .exec(function(err, data){
        Event.count({}, function(err, count){
          if (err) res.serverError(err);
          return res.ok({
            data: data,
            count : count
          });
        });
    });
  },
  resume: function (req, res){
    console.log('resume');
    EventService.getEventsByDay(function(err, data){
        if (err){
          return res.serverError(err);
        }
        return res.ok(data);
    });
  },
  totals: function(req, res){
    EventService.getEventsTotals(function(err, data){
        if (err){
          return res.serverError(err);
        }
        return res.ok(data);
    });
  },
  cancelAppointment: function (req, res){
    console.log('set an Appoinment as cancelled');
    EventService.cancelAppointment(req.body.appoinmentId, function(err, data){
      if (err){
        return res.serverError(err);
      }
      return res.ok(data);
    });
  },
  log:function(req, res){
    console.log('logging an Appoinment');
    EventService.logEvent(req.body, function(err, resp){
      if (err){
        return res.serverError(err);
      }
      return res.ok(resp);
    });
  },
  webhook:function(req, res){
    console.log('logging an Appoinment');
    var timestamp = req.body.time_ms;
    var events = req.body.events;

    console.log(events);

    EventService.logEvent(events, function(err, resp){
      if (err){
        return res.serverError(err);
      }
      return res.ok(resp);
    });
  },

};
