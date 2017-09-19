var Dispatcher   = require('../dispatcher/Dispatcher');
var Constants    = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var router       = require('../router');

var ActionTypes  = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID   = null;
var _threads     = {};
var loginModal   = false;
var _authToken   = localStorage.getItem('authToken');
var _adminID     = localStorage.getItem('adminID');
var _adminMail   = localStorage.getItem('adminMail');
var _errorMessage= '';

var SessionStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    if(localStorage.getItem('ShakaAuthorization')!=null && localStorage.getItem('ShakaAuthorization')!=''){
      return true;
    }else{
      return false;
    }

  },

  getErrors: function() {
    return _errorMessage;
  },

  getAdminId: function() {
    return _adminID;
  },

  getAdminMail: function() {
    return _adminMail;
  },

  getAuthToken: function() {
    return localStorage.getItem('ShakaAuthorization');
  },
  setAuthToken: function(token) {
    localStorage.setItem('ShakaAuthorization', token);
  },
  openLoginModal: function () {
    loginModal = true;
    SessionStore.emitChange();
  },
  getLoginModal: function () {
    return loginModal;
  },
  setLoginModal: function (modal) {
    loginModal = modal;
    SessionStore.emitChange();
  },


});

SessionStore.dispatchToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {

    case ActionTypes.LOGIN_RESPONSE:

      SessionStore.emitChange();
    break;

    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
    break;

    case ActionTypes.ERROR:
      _errorMessage = action.res;
      _errorCode = action.code;
      SessionStore.emitChange();
    break;

    case ActionTypes.NEWADMIN_RESPONSE:
      if (action.res.message){
        _errorMessage = action.res.message;
      }
      SessionStore.emitChange();
    break;

    case ActionTypes.LOGOUT:
      _currentID = '';
      _authToken = '';
      _adminID = '';
      _adminMail = '';
      localStorage.removeItem('ShakaAuthorization');
      localStorage.removeItem('consultantUser');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('username');
      localStorage.removeItem('consultantId');
      localStorage.removeItem('consultantMail');
      localStorage.removeItem('consultantPhone');
      localStorage.removeItem('consultantWeb');
      localStorage.removeItem('openModal');

      SessionStore.emitChange();
    break;


    default:

        if(action.res!= null && action.code!=null && (action.code==401)){
          _currentID = '';
          _authToken = '';
          _adminID = '';
          _adminMail = '';
          localStorage.removeItem('authToken');
          localStorage.removeItem('adminID');
          localStorage.removeItem('adminMail');
          localStorage.removeItem('isSuper');
          localStorage.removeItem('entityId');
          localStorage.removeItem('contactId');
          localStorage.removeItem('areaId');
          localStorage.removeItem('serviceId');


        }



        SessionStore.emitChange();
      break;
  }

  return true;
});

module.exports = SessionStore;
