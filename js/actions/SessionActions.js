var ShakaAPIUtils = require ('../utils/ShakaAPIUtils');

module.exports = {

	login: function(user) {
		ShakaAPIUtils.login(user);
	},
	signup: function(user) {
		ShakaAPIUtils.signup(user);
	},
	consult: function(consult) {
		ShakaAPIUtils.consult(consult);
	},
	loginConsultant: function(consultant_director) {
		ShakaAPIUtils.loginConsultant(consultant_director);
	},
	newAdmin: function(email, password, isSuper) {
		ShakaAPIUtils.newAdmin(email, password, isSuper);
	},

}
