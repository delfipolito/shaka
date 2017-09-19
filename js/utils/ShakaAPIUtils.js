var request             = require('superagent');
var Constants           = require('../constants/Constants');
var SessionStore        = require('../stores/SessionStore');
var RouteStore          = require('../stores/RouteStore');
var ConsultantsStore    = require('../stores/ConsultantsStore');
var showConsultants     = require('../actions/ServerActions').showConsultants;
var showConsultant      = require('../actions/ServerActions').showConsultant;
var showMoreConsultants  = require('../actions/ServerActions').showMoreConsultants;
var showComments        = require('../actions/ServerActions').showComments;
var showRatings         = require('../actions/ServerActions').showRatings;
var showAdminComments   = require('../actions/ServerActions').showAdminComments;
var loginResponse       = require('../actions/ServerActions').loginResponse;
var showMoreAdminComments= require('../actions/ServerActions').showMoreAdminComments;
var redirect            = require('../actions/RouteActions').redirect;
var error               = require('../actions/ServerActions').error;
var APIEndpoints        = Constants.APIEndpoints;

module.exports = {

  login: function(user) {
    request
      .post(APIEndpoints.PUBLIC + '/login')
      .send({user})
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if(code>= 400){
          error(text.errors, code);
        }else{
            SessionStore.setLoginModal(false);
            var atoken= res.xhr.getResponseHeader("Authorization");
            localStorage.setItem('ShakaAuthorization', atoken);
            localStorage.setItem('username', text.username);
            localStorage.setItem('consultantUser', 'false');
            if(text.admin == true){
              localStorage.setItem('isAdmin', 'true');
            }else{
              localStorage.setItem('isAdmin', 'false');
            }
            loginResponse();
        }
      }.bind(this));
  },
  loginConsultant: function(consultant_director) {
    request
      .post(APIEndpoints.CONSULTANTD + '/login')
      .send({consultant_director})
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if(code>= 400){
          error(text.errors, code);
        }else{
            SessionStore.setLoginModal(false);
            var atoken= res.xhr.getResponseHeader("Authorization");
            localStorage.setItem('ShakaAuthorization', atoken);
            localStorage.setItem('username', text.name);
            localStorage.setItem('consultantUser', 'true');
            localStorage.setItem('consultantId', text.id);
            localStorage.setItem('consultantAddress', text.address.main);
            localStorage.setItem('consultantPhone', text.phone);
            localStorage.setItem('consultantWeb', text.web_page);
            localStorage.setItem('consultantMail', text.mail);
            redirect('consultantProfile');
            loginResponse();
        }
      }.bind(this));
  },


  signup: function(user) {
    request
      .post(APIEndpoints.PUBLIC + '/users')
      .send({user})
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if(code>= 400){
          error(text.errors, code);
        }else{
            SessionStore.setLoginModal(false);
            var atoken= res.xhr.getResponseHeader("Authorization");
            localStorage.setItem('ShakaAuthorization', atoken);
            localStorage.setItem('username', text.username);
            localStorage.setItem('consultantUser', 'false');
            if(text.admin == true){
              localStorage.setItem('isAdmin', 'true');
            }else{
              localStorage.setItem('isAdmin', 'false');
            }
            loginResponse();
        }
      }.bind(this));
  },
  consult: function(consult) {
    request
      .post(APIEndpoints.PUBLIC + '/consults')
      .send({consult})
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if(code>= 400){
          error(text.errors, code);
        }else{
            consultResponse();
        }
      }.bind(this));
  },

//GET  de todas las consultoras
  getAllConsultants: function() {
    request
      .get(APIEndpoints.PUBLIC + '/consultants')
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        localStorage.setItem('search_consultant', '');
        showConsultants(text);
    }.bind(this));
  },

  //GET  de todas las consultoras por nombre
  getConsultants: function() {
      var string = localStorage.getItem('search');
      var search_consultant = {};
      search_consultant.with_name_including = string;
      request
        .post(APIEndpoints.PUBLIC + '/search_consultants')
        .send({search_consultant})
        .set('Accept', 'aplication/json')
        .end(function(res) {
          var text = JSON.parse(res.text);
          var code = JSON.parse(res.status);
          showConsultants(text);

          localStorage.setItem('search_consultant', search_consultant.with_name_including);
      }.bind(this));
    },
    //GET  de todas las consultoras por nombre
    getMoreConsultants: function(page) {
        var string = localStorage.getItem('search_consultant');
        var search_consultant = {};
        search_consultant.with_name_including = string;
        request
          .post(APIEndpoints.PUBLIC + '/search_consultants')
          .send({page: page, search_consultant: search_consultant})
          .set('Accept', 'aplication/json')
          .end(function(res) {
            var text = JSON.parse(res.text);
            var code = JSON.parse(res.status);
            showMoreConsultants(text);
        }.bind(this));
    },

//GET  de una consultora en particular
  getConsultant: function(consultantId) {
    request
      .get(APIEndpoints.PUBLIC + '/consultants/' + consultantId)
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        showConsultant(text);
    }.bind(this));
  },

//GET los comentarios de una consultora en particular
  getComments: function(consultantId) {
    request
      .get(APIEndpoints.PUBLIC + '/consultants/' + consultantId + '/comment_threads')
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        showComments(res);
    }.bind(this));
  },
  //POST  de un comentario de una consultora en particular
  sendComment: function(consultantId, topic) {
      request
        .post(APIEndpoints.PUBLIC + '/consultants/' + consultantId + '/comment_threads')
        .send({content: topic})
        .set('Authorization', localStorage.getItem('ShakaAuthorization'))
        .set('Accept', 'aplication/json')
        .end(function(res) {
          var text = JSON.parse(res.text);
          var code = JSON.parse(res.status);
          this.getConsultant(consultantId);
          this.getComments(consultantId);
      }.bind(this));
    },

    //POST  una respuesta de un comentario de una consultora en particular
  sendCommentReply: function(consultantId, commentId, topic) {
        request
          .post(APIEndpoints.PUBLIC + '/consultants/' + consultantId + '/comment_threads/' + commentId + '/answer' )
          .send({content: topic})
          .set('Authorization', localStorage.getItem('ShakaAuthorization'))
          .set('Accept', 'aplication/json')
          .end(function(res) {
            var text = JSON.parse(res.text);
            var code = JSON.parse(res.status);
            this.getConsultant(consultantId);
            this.getComments(consultantId);
            this.getRatings(consultantId);
        }.bind(this));
  },

  sendConsultantCommentReply: function(consultantId, commentId, topic) {
    request
      .post(APIEndpoints.CONSULTANTD + '/comment_threads/' + commentId + '/answer' )
      .send({content: topic})
      .set('Authorization', localStorage.getItem('ShakaAuthorization'))
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        this.getComments(consultantId);
    }.bind(this));
  },

  //GET los ratings  de una consultora en particular
    getRatings: function(consultantId) {
      request
        .get(APIEndpoints.PUBLIC + '/consultants/' + consultantId + '/consultant_ratings')
        .set('Authorization', localStorage.getItem('ShakaAuthorization'))
        .set('Accept', 'aplication/json')
        .end(function(res) {
          var text = JSON.parse(res.text);
          var code = JSON.parse(res.status);
          showRatings(text);

      }.bind(this));
    },

  //POST  de un rating de una consultora en particular
    sendRating: function(consultantId, consultant_rating) {
      request
        .post(APIEndpoints.PUBLIC + '/consultants/' + consultantId +  '/consultant_ratings')
        .send({consultant_rating: consultant_rating})
        .set('Authorization', localStorage.getItem('ShakaAuthorization'))
        .set('Accept', 'aplication/json')
        .end(function(res) {
          var text = JSON.parse(res.text);
          var code = JSON.parse(res.status);
          this.getConsultant(consultantId);
          this.getComments(consultantId);
          this.getRatings(consultantId);
      }.bind(this));
    },
// ADMINISTRACION

  getAdminComments: function() {
    request
      .get(APIEndpoints.ADMIN+ '/comments/unmarked')
      .set('Authorization', localStorage.getItem('ShakaAuthorization'))
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        showAdminComments(res);
    }.bind(this));
  },
  getMoreAdminComments: function(page) {
    request
      .get(APIEndpoints.ADMIN + '/comments/unmarked')
      .query({page: page})
      .set('Authorization', localStorage.getItem('ShakaAuthorization'))
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        showMoreAdminComments(res);
    }.bind(this));
  },
  aproveComment: function(commentId) {
    request
      .post(APIEndpoints.ADMIN + '/comments/'+ commentId + '/mark_approved')
      .set('Authorization', localStorage.getItem('ShakaAuthorization'))
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        this.getAdminComments();
    }.bind(this));
  },

  deleteComment: function(commentId) {
    request
      .post(APIEndpoints.ADMIN + '/comments/'+ commentId + '/mark_offensive')
      .set('Authorization', localStorage.getItem('ShakaAuthorization'))
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        this.getAdminComments();
    }.bind(this));
  },

};
