var ShakaAPIUtils = require ('../utils/ShakaAPIUtils');

module.exports = {


	getAdminComments: function() {
		ShakaAPIUtils.getAdminComments();
	},
	getMoreAdminComments: function(page) {
		ShakaAPIUtils.getMoreAdminComments(page);
	},

	aproveComment: function(commentId) {
		ShakaAPIUtils.aproveComment(commentId);
	},
	deleteComment: function(commentId) {
		ShakaAPIUtils.deleteComment(commentId);
	},

};
