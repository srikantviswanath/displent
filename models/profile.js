Displent.Profile = DS.Model.extend({
	firstName: DS.attr(),
	lastName: DS.attr(),
	profilePic: DS.attr(),
	membership: DS.attr(),
	memberSince: DS.attr(),
	themePic: DS.attr()
});

Displent.ProfileSerializer = DS.RESTSerializer.extend({
	normalizePayload: function(payload){
		console.log("paylod");
		console.log(payload);
		var idPayload = payload.map(function(profile){
				return {
				id: profile.id,
				firstName: profile.first_name,
				lastName: profile.last_name,
				profilePic: profile.profile_pic,
				membership: profile.membership,
				memberSince: profile.member_since,
				themePic: profile.theme_pic
			};
		});
		//console.log('Hello');
		//console.log(idPayload);
		var result = {profile: idPayload};
		return result;
	}
});