var Dispatcher  = require ('../dispatcher/Dispatcher');
var ActionTypes   = require ('../constants/Constants').ActionTypes;

module.exports = {
	loginResponse: function() {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.LOGIN_RESPONSE,
		});
	},
	logout: function() {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.LOGOUT,
		});
	},
	error: function(text, code) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.ERROR,
			res: text,
			code: code
		});
	},
	showConsultants: function(res) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_CONSULTANTS,
			res: res,
		});
	},
	showMoreConsultants: function(res) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_MORE_CONSULTANTS,
			res: res,
		});
	},

	showConsultant: function(res) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_CONSULTANT,
			res: res,
		});
	},

	showComments: function(res) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_COMMENTS,
			res: res,
		});
	},

	showAdminComments: function(res) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_ADMIN_COMMENTS,
			res: res,
		});
	},

	showMoreAdminComments: function(res) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_MORE_ADMIN_COMMENTS,
			res: res,
		});
	},

	showRatings: function(res) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.SHOW_RATINGS,
			res: res,
		});
	},

	error: function(text, code) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.ERROR,
			res: text,
			code: code
		});
	},




}
