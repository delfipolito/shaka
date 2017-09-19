var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var RouteStore                   = require('../stores/RouteStore');
var SessionStore                 = require('../stores/SessionStore');
var redirect                     = require('../actions/RouteActions').redirect;
var CommentReply                 = require('./CommentReply.react');
var ConsultantCommentReply       = require('./ConsultantCommentReply.react');
var sendCommentReplyAction       = require('../actions/ConsultantsActions').sendCommentReply;
var sendConsultantCommentReplyAction  = require('../actions/ConsultantsActions').sendConsultantCommentReply;


module.exports = React.createClass({

    getInitialState: function(){
        if(SessionStore.isLoggedIn()){
          var reply = 'col-xs-10 col-xs-offset-1 noPadding';
        }else{
          var reply = 'hidden';
        }
        return {
          replyButton: reply,
          replytext: 'hidden'
        };
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
      if(SessionStore.isLoggedIn()){
        var reply = 'col-xs-10 col-xs-offset-1 noPadding';
      }else{
        var reply = 'hidden';
      }
      return {
        replyButton: reply,
        replytext: 'hidden'
      };
    },
    reply: function () {
      this.setState({
        replyButton: 'hidden',
        replytext: ''
      });
    },
    _onSubmit: function(e) {
        e.preventDefault();
        var form  = e.target.elements;
        if(localStorage.getItem('consultantUser')=='true'){
          var topic = form.commentReply.value;
          sendConsultantCommentReplyAction(this.props.consultantId, this.props.comment.id, topic);
        }else{
          var topic = form.commentReply.value;
          sendCommentReplyAction(this.props.consultantId, this.props.comment.id, topic);

        }

        form.commentReply.value = '';

        this.setState({
          replyButton: '',
          replytext: 'hidden'
        });
    },


    render: function() {
        var allReplies = [];
        if(this.props.comment.answers!=null){
          for(var key in this.props.comment.answers){
            if(this.props.comment.answers[key].comes_from_user=='true' || this.props.comment.answers[key].comes_from_user==true){
              allReplies.push(<div className="row reply-row"><CommentReply comment={this.props.comment.answers[key]}/></div>);
            }else{
              allReplies.push(<div className="row reply-row"><ConsultantCommentReply comment={this.props.comment.answers[key]}/></div>);
            }

          }
        }
        return(
          <div className="box commmentContainer">
            <div className="row principalComment">
              <div className="col-xs-10 col-xs-offset-1 header-comment valign-wrapper">
                <div className="col-xs-2 comment-photo-div valign">
                  <img src="./images/man.png" height="60" width="60" className="img-circle pull-right"/>
                </div>
                <div className="col-xs-10 valign">
                  <p><span className="title-to-p">{this.props.comment.first_comment.username}</span><span className="ago pull-right">{this.props.comment.first_comment.ago}</span></p>
                </div>
              </div>
              <div className="col-xs-10 col-xs-offset-1 noPadding">
                <div className="col-xs-12 noPadding">
                  <p className="commentText">{this.props.comment.first_comment.content}</p>
                </div>
              </div>
              <div className={this.state.replyButton}>
                <button className="go-to-reply" onClick={this.reply}>RESPONDER</button>
              </div>
            </div>
            {allReplies}
            <div className={"row reply-row " + this.state.replytext}>
              <form className="form-inline col-xs-10 col-xs-offset-1 noPadding" onSubmit={this._onSubmit}>
                <div className="form-group text-area-box">
                  <textarea className="replyTextArea" ref="commentReply" rows="1" name="commentReply" placeholder="Respuesta al comentario..."></textarea>
                </div>
                <div className="form-group pull-right">
                  <button type="submit" className="send-reply">ENVIAR</button>
                </div>
              </form>
            </div>
          </div>
        )
    }
});
