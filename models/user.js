Displent.User = DS.Model.extend({
	firstName: DS.attr(),
	lastName: DS.attr(),
	profilePic: DS.attr(),
	membership: DS.attr()
});

Displent.UserSerializer = DS.RESTSerializer.extend({
	normalizePayload: function(payload){
		var idPayload = payload.map(function(user){
			return {
				id: user.id,
				firstName: user.first_name,
				lastName: user.last_name,
				profilePic: user.profile_pic,
				membership: user.membership
			};
		});
		var result = {user: idPayload};
		return result;
	}
})