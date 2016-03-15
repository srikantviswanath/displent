Displent.Profile = DS.Model.extend({
	firstName: DS.attr(),
	lastName: DS.attr(),
	profilePic: DS.attr(),
	membership: DS.attr(),
	memberSince: DS.attr(),
	themePic: DS.attr(),
	photo: DS.hasMany('photo', {async:true})
});

//Displent.ProfileAdapter = DS.FixtureAdapter;


Displent.ProfileSerializer = DS.RESTSerializer.extend({
	attrs:{
		photo: {embedded: 'load'}
	},
	
	serializeIntoHash: function(data, type, record, options) {
	    var payload = this.serialize(record, options);
	    Ember.keys(payload).forEach(function(key){
        	var newKey = Ember.String.underscore(key);
        	if(newKey!=key){
        		payload[newKey] = payload[key];
        		delete payload[key];
        	}
        });
	    console.log(payload);
	    Ember.merge(data, payload);
	},

	normalizePayload: function(payload){
		console.log("profile payload:");
		console.log(payload);
		Ember.keys(payload).forEach(function(key){
			
			var newKey = Ember.String.camelize(key);
			if (newKey !== key) {
			  payload[newKey] = payload[key];
			  delete payload[key];
			}
		});
		var result = {profile: payload};
		console.log("result");
		console.log(result);
		return result;
	}

});