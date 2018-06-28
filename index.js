'use strict';

module.exports = function() {
	var fs = require('fs');
	var async = require('async');
	var _ = require('lodash');

	var items = {};

	var self = {
		onChange: function(name) {},
		add: function(name, file) {
			items[name] = {
				file: file,
				value: null,
				setter: function (cb) {
					fs.readFile(file, function(err, data) {
						items[name].value = data.toString();
						if (cb) {cb(err, data);}
					});
				}
			};
			fs.watchFile(
				file,
				{ persistent: true, interval: 5007 },
				function() {items[name].setter(self.onChange(name));}
			)
		},
		get: function(name) {
			return items[name].value;
		},
		getAll: function(cb) {
			async.parallel(
				_.map(items, function(item) {return item.setter;}),
				function(err, results) {
					cb(items);
				}
			);
		}
	};
	return self;
};