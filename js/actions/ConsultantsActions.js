var ShakaAPIUtils = require ('../utils/ShakaAPIUtils');

module.exports = {

	getAllConsultants: function() {
		ShakaAPIUtils.getAllConsultants();
	},
	getConsultants: function() {
		ShakaAPIUtils.getConsultants();
	},
	getMoreConsultants: function(search) {
		ShakaAPIUtils.getMoreConsultants(search);
	},
	selectConsultant: function(consultantId) {
		ShakaAPIUtils.getConsultant(consultantId);
	},

	getComments: function(consultantId) {
		ShakaAPIUtils.getComments(consultantId);
	},
	sendComment: function(consultantId, topic) {
		ShakaAPIUtils.sendComment(consultantId, topic);
	},
	sendCommentReply: function(consultantId, commentId, topic) {
		ShakaAPIUtils.sendCommentReply(consultantId, commentId, topic);
	},
	getConsultant: function(id) {
		ShakaAPIUtils.getConsultant(id);
	},

	sendConsultantCommentReply: function(consultantId, commentId, topic) {
		ShakaAPIUtils.sendConsultantCommentReply(consultantId, commentId, topic);
	},

	getRatings: function(consultantId) {
		ShakaAPIUtils.getRatings(consultantId);
	},
	sendRating: function(consultantId, consultant_rating) {
		ShakaAPIUtils.sendRating(consultantId, consultant_rating);
	},


};
