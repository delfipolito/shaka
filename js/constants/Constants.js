var keyMirror = require('keymirror');
var Root      = "https://shaka-api-stg.herokuapp.com/api/v1";
var Root2      = "http://10.0.0.7:3000/api/v1";
var APIRoot   = Root + "/web";

module.exports = {

  ActionTypes: keyMirror({
    LOGIN_RESPONSE: null,
    NEWADMIN_RESPONSE: null,
    LOGOUT: null,
    REDIRECT: null,
    ERROR: null,
    SHOW_CONSULTANTS: null,
    SHOW_MORE_CONSULTANTS: null,
    SHOW_CONSULTANT: null,
    SHOW_COMMENTS: null,
    SHOW_ADMIN_COMMENTS: null,
    SHOW_MORE_ADMIN_COMMENTS: null,
    SHOW_RATINGS: null,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  APIEndpoints: {
    PUBLIC:      Root + '/user',
    CONSULTANTD:  Root + '/consultant_director',
    ADMIN:       Root + '/admin'
  }

};
