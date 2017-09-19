var Dispatcher   = require('../dispatcher/Dispatcher');
var Constants    = require('../constants/Constants');
var SessionStore = require('../stores/SessionStore');
var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var ActionTypes  = Constants.ActionTypes;
var router       = require('../router');
var CHANGE_EVENT = 'change';

var _comments    = {};
var _pagination  = {};
var _textError   = '';
var _errorCode   = '';

var AdminStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCodeError: function(){
    return _errorCode;
  },

  getTextError: function(){
    return _textError;
  },

  getAdminComments: function(){
    return _comments;
  },
  getPagination: function(){
    return _pagination;
  },

});

AdminStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {


    case ActionTypes.SHOW_ADMIN_COMMENTS:
      _comments= action.res.body.comments;
      _pagination= action.res.body.pagination;
      _textError = '';
      _errorCode = '';
      AdminStore.emitChange();
    break;
    case ActionTypes.SHOW_MORE_ADMIN_COMMENTS:
      _comments = _comments.concat(action.res.body.comments);
      _pagination= action.res.body.pagination;
      _textError = '';
      _errorCode = '';
      AdminStore.emitChange();
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
      AdminStore.emitChange();
    break;

    default:

  }

  return true;
});

module.exports = AdminStore;
