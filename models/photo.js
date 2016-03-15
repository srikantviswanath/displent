Displent.Photo = DS.Model.extend({
	path: DS.attr('string'),
	title: DS.attr('string'),
	owner: DS.belongsTo('user', {async:true}),
	location: DS.attr('string'),
	dateTaken: DS.attr('date'),
	focalLength: DS.attr('number'),
	tags: DS.attr()

});


Displent.PhotoSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin,{
	attrs:{
		owner: {embedded: 'load'}
	},

	normalizePayload: function(payload){
		Ember.keys(payload).forEach(function(key){
			var newKey = Ember.String.camelize(key);
			if (newKey !== key) {
			  payload[newKey] = payload[key];
			  delete payload[key];
			}
		});
		var result = {photo: payload};
		return result;
	}
});