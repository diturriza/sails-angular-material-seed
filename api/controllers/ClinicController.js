/**
 * ClinicController
 *
 * @description :: Server-side logic for managing Clinics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  search: function(req, res) {

  },
  index: function(req, res) {
    if (req.isSocket) {
      // subscribe client to model changes
      Clinic.watch(req.socket);
      return res.ok({
        message: 'User subscribed to Clinic Changes ' + req.socket.id
      })
    }

    ClinicService.getClinics(req.token.id, {
      page: req.query.page || 1,
      limit: req.query.limit || 5
    }, function(err, data) {
      if (err) {
        res.serverError(err);
      }
      
      return res.ok({
        data: data.res,
        count: data.count
      });
    });
  }
};
