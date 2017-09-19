var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var RouteStore                   = require('../stores/RouteStore');
var SessionStore                 = require('../stores/SessionStore');
var redirect                     = require('../actions/RouteActions').redirect;
var AdminCommentReply            = require('./AdminCommentReply.react');
var sendCommentReplyAction       = require('../actions/ConsultantsActions').sendCommentReply;
var aproveComment                = require('../actions/AdminActions').aproveComment;
var deleteComment                = require('../actions/AdminActions').deleteComment;

module.exports = React.createClass({

    getInitialState: function(){
      return{
        com: 'hol',
      }
    },
    componentWillMount: function(){

    },
    componentDidMount: function() {
        RouteStore.addChangeListener(this._onChange);
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        RouteStore.removeChangeListener(this._onChange);
        SessionStore.addChangeListener(this._onChange);
    },
    _onChange: function() {

    },
    aprove: function () {
        aproveComment(this.props.comment.id);
    },
    delete: function () {
        deleteComment(this.props.comment.id);
    },


    render: function() {
        var name = '';
        var img = '';
        var commentClass = '';
        if(this.props.comment.comes_from_user=='true' || this.props.comment.comes_from_user==true){
          name = this.props.comment.username;
          commentClass="commentName";
          img = (<img src="./images/man.png" height="60" width="60" className="img-circle pull-right"/>);
        }else{
          name = this.props.comment.consultant_name;
          commentClass="consultantCommentName";
          img = (<img src="./images/briefcase2.png" height="60" width="60" className="img-circle pull-right"/>);
        }
        return(
          <div className="container commmentContainer">
            <div className="row principalComment">
              <div className="col-xs-1">
                {img}
              </div>
              <div className="col-xs-11">
                <p><span className={commentClass}>{name}</span><span className="ago pull-right">{this.props.comment.ago}</span></p>
                <p className="commentText">{this.props.comment.content}</p>
              </div>
              <div className="col-xs-12">
                <div className='pull-right'>
                  <button className="sendRatingButton replyButton deleteButton" onClick={this.delete}>ELIMINAR</button>
                  <button className="sendRatingButton replyButton" onClick={this.aprove}>APROBAR</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
});
