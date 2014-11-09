Displent.PhotoThumbnail = DS.Model.extend({
	path: DS.attr('string'),
	title: DS.attr('string'),
	owner: DS.belongsTo('user', {async: true}),

});

Displent.PhotoThumbnailSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin,{
	attrs:{
		owner: {embedded: 'always'}
	},

	normalizePayload: function(payload){
		if(Array.isArray(payload)){
			for(var photoIndex in payload){
				var photo = payload[photoIndex];
				if(typeof(photo) === 'object'){
					Ember.keys(photo).forEach(function(photoKey){
						if(photoKey=='owner'){
							var owner = photo[photoKey];
							Ember.keys(owner).forEach(function(ownerKey){
								var camelKey = Ember.String.camelize(ownerKey);
								if(camelKey != ownerKey){
									owner[camelKey] = owner[ownerKey];
									delete owner[ownerKey];
								}
							});
						}
						var newKey = Ember.String.camelize(photoKey);
						if(newKey != photoKey){
							photo[newKey] = photo[photoKey];
							delete photo[photoKey];
						}
					});
				}
				
			}
			var result = {photoThumbnail: payload};
			return result;
		}
	}
});