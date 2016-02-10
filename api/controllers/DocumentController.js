/**
 * DocumentController
 *
 * @description :: Server-side logic for managing documents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	register: function (req,res) {

		var params = req.params.all();

		async.parallel({
		    inputs: function(callback){
					var inputs = req.param('inputs');
					Input.create(inputs).exec(function (err, inputs) {
						if(err){
							callback(err);
						}
						params.inputs = inputs;
						callback(null, inputs);
					});
		    },
		    labels: function(callback){
					var labels = req.param('labels');
					Label.create(labels).exec(function (err, labels) {
						if(err){
							callback(err);
						}
						params.labels = labels;
						callback(null, labels);
					});
		    },
		    supplies: function(callback){
					var supplies = req.param('supplies');
					Supply.create(supplies).exec(function (err, supplies) {
						if(err){
							callback(err);
						}
						params.supplies = supplies;
						callback(null, supplies);
					});
		    }
		},
		function(err, results) {
		  if (err) {
		  	return res.badRequest(err)
		  }
			console.log(results);
			if(results){
				Document.create(params).exec(function(err,document) {
					if(err){
						return res.badRequest(err)
					}
					return res.ok(document);
				});
			}
		});


	}
};
