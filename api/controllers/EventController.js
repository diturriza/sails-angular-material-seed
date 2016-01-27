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
  subscribe: function(req, res){
    if(req.isSocket){
      // subscribe client to model changes
      Event.watch(req.socket);

      res.ok({
        message: 'User subscribed to Event Changes ' + req.socket.id
      })
    };
  },
  open: function(req,res){
    //console.log(sails.sockets.rooms());
    console.log(sails.sockets.subscribers('events_changes'));
     sails.sockets.broadcast('events_changes', { msg: 'new guy here!' });
     return res.ok(sails.sockets.rooms());
  },

  index: function(req, res){
    var criteria = {};
    if(req.query.clinicId && req.query.clinicId != 'all'){
      criteria = {
        clinicId: req.query.clinicId
      }
    }


    Event.find(criteria)
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
    EventService.getEventsByDay(req.query.clinicId, function(err, data){
        if (err){
          return res.serverError(err);
        }
        return res.ok(data);
    });
  },
  totals: function(req, res){
    EventService.getEventsTotals(req.query.clinicId, function(err, data){
        if (err){
          return res.serverError(err);
        }
        return res.ok(data);
    });
  },
  cancelAppointment: function (req, res){
    console.log('set an Appoinment as cancelled');
    EventService.cancelAppointment(req.body.appointmentId, function(err, resp){
      if (err){
        return res.serverError(err);
      }
      Event.publishCreate(resp);
      return res.ok(resp);
    });
  },
  log:function(req, res){
    console.log('logging an Appoinment');
    EventService.logEvent(req.body, function(err, resp){
      if (err){
        return res.serverError(err);
      }
      Event.publishCreate(resp);
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
