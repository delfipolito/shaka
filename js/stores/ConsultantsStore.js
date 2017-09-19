var Dispatcher   = require('../dispatcher/Dispatcher');
var Constants    = require('../constants/Constants');
var SessionStore = require('../stores/SessionStore');
var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var ActionTypes  = Constants.ActionTypes;
var router       = require('../router');
var CHANGE_EVENT = 'change';

var _consultants = [];
var _pagination  = {};
var _consultant  = '';
var _comments    = {};
var _ratings    = {};
var _textError   = '';
var _errorCode   = '';

var ConsultantsStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getConsultants: function() {
    return _consultants;
  },

  getConsultant: function() {
    return _consultant;
  },

  getCodeError: function(){
    return _errorCode;
  },

  getComments: function(){
    return _comments;
  },

  getRatings: function(){
    return _ratings;
  },
  getPagination: function(){
    return _pagination;
  },

  getTextError: function(){
    return _textError;
  }

});

ConsultantsStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    case ActionTypes.SHOW_CONSULTANTS:
      _consultants= action.res.consultants;
      _pagination = action.res.pagination;
      _textError = '';
      _errorCode = '';
      ConsultantsStore.emitChange();
    break;

    case ActionTypes.SHOW_MORE_CONSULTANTS:
      _consultants = _consultants.concat(action.res.consultants);
      _pagination= action.res.pagination
      _textError = '';
      _errorCode = '';
      ConsultantsStore.emitChange();
    break;

    case ActionTypes.SHOW_CONSULTANT:
      _consultant= action.res;
      _textError = '';
      _errorCode = '';
      ConsultantsStore.emitChange();
    break;

    case ActionTypes.SHOW_COMMENTS:
      _comments= action.res.body.comment_threads;
      _textError = '';
      _errorCode = '';
      ConsultantsStore.emitChange();
    break;
    case ActionTypes.SHOW_RATINGS:
      _ratings= action.res;
      _textError = '';
      _errorCode = '';
      ConsultantsStore.emitChange();
    break;

    case ActionTypes.ERROR:
      if(action.code==401){
          localStorage.removeItem('authToken');
          localStorage.removeItem('adminID');
          localStorage.removeItem('adminMail');
          localStorage.removeItem('Access-Token');
          localStorage.removeItem('Client');
          localStorage.removeItem('Expiry');
          localStorage.removeItem('Uid');
      }
      _textError= action.res;
      _errorCode = action.code;
      ConsultantsStore.emitChange();
    break;

    default:

  }

  return true;
});

module.exports = ConsultantsStore;
