var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var SessionStore                 = require('../stores/SessionStore');
var RouteStore                   = require('../stores/RouteStore');
var AdminStore                   = require('../stores/AdminStore');
var redirect                     = require('../actions/RouteActions').redirect;
var getAdminComments             = require('../actions/AdminActions').getAdminComments;
var getMoreAdminComments         = require('../actions/AdminActions').getMoreAdminComments;
var AdminComment                 = require('./AdminComment.react.js');


module.exports = React.createClass({

    getInitialState: function(){
        return {
            comments: [],
            notifications: 0,
        };
    },
    componentWillMount: function(){

    },
    componentDidMount: function() {
        RouteStore.addChangeListener(this._onChange);
        SessionStore.addChangeListener(this._onChange);
        AdminStore.addChangeListener(this._onChange);
        getAdminComments();
    },

    componentWillUnmount: function() {
        RouteStore.removeChangeListener(this._onChange);
        SessionStore.addChangeListener(this._onChange);
        AdminStore.addChangeListener(this._onChange);

    },
    _onChange: function() {
      if (this.isMounted()) {
        if(AdminStore.getPagination().current_page < AdminStore.getPagination().total_pages){
          var loadMore = (
            <div className="centered">
              <button className="loadMoreButton" onClick={this.nextPage}>CARGAR MAS...</button>
            </div>);
        }else{
          var loadMore = '';
        }
        this.setState({
            comments: AdminStore.getAdminComments(),
            pagination: AdminStore.getPagination(),
            loadMore: loadMore,
            notifications: AdminStore.getPagination().total_items,
        });
      }
    },
    nextPage: function(){
      if(this.state.pagination.current_page < this.state.pagination.total_pages){
        getMoreAdminComments(parseInt(this.state.pagination.current_page) + 1);
      }
    },

    render: function() {
        var comments    = this.state.comments;
        var allComments = [];
        var notifications = this.state.comments.length;
        for (var key in comments) {
          allComments.push(<AdminComment key={key} comment={comments[key]} />);
        }


        return(
          <div className="adminContainer">
              <div className="notificationAdminPanel pull-right">TIENES {this.state.notifications} MENSAJES NUEVOS</div>
              <div className="adminCommentsPadding">{allComments}</div>

              {this.state.loadMore}
          </div>
        );
    }
});
