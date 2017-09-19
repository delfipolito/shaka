var Dispatcher        = require('../dispatcher/Dispatcher');
var Constants         = require('../constants/Constants');
var EventEmitter      = require('events').EventEmitter;
var assign            = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var router = require('../router');
var _errorMessage = '';
var _errorCode    = '';
var _textError    = '';

var RouteStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getRouter: function() {
    return router;
  },

  redirectHome: function() {
    router.transitionTo('profile');
  },
  getErrors: function() {
    return _errorMessage;
  },
  getCodeError: function(){
    return _errorCode;
  },
  setCodeError: function(nro){
    _errorCode = nro;
  },

  getTextError: function(){
    return _textError;
  },
});


RouteStore.dispatchToken = Dispatcher.register(function(payload) {

  var action = payload.action;
  switch(action.actionType) {

    case ActionTypes.LOGOUT:
      router.transitionTo('profile');

    break;

    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);

    break;

    case ActionTypes.SHOW_CONSULTANTS:
      router.transitionTo('allConsultants');

    break;
    case ActionTypes.SHOW_CONSULTANT:

    break;
    case ActionTypes.ERROR:
      if(action.code==401){

      }
      _textError= action.res;
      _errorCode = action.code;
      RouteStore.emitChange();

    break;


    default:
  }

  return true;
});

module.exports = RouteStore;
