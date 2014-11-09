Displent.User = DS.Model.extend({
	firstName: DS.attr(),
	lastName: DS.attr(),
	profilePic: DS.attr(),
	membership: DS.attr(),
	
});

Displent.UserSerializer = DS.RESTSerializer.extend({
	normalizePayload: function(payload){
		if(Array.isArray(payload)){
			for(var userIndex in payload){
				var user = payload[userIndex];
				if(typeof(user) === 'object'){
					Ember.keys(user).forEach(function(userKey){
					var newKey = Ember.String.camelize(userKey);
					if(newKey != userKey){
						user[newKey] = user[userKey];
						delete user[userKey];
					}
					});
				}
				
			}
			var result = {user: payload};
			return result;
		}
		else{
			Ember.keys(payload).forEach(function(key){
				var newKey = Ember.String.camelize(key);
				if(newKey != key){
					payload[newKey] = payload[key];
					delete payload[key];
				}
			});
			var result = {user: payload};
			return result;
		}
	}
});