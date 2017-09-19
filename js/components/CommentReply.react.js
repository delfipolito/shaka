var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var RouteStore                   = require('../stores/RouteStore');
var redirect                     = require('../actions/RouteActions').redirect;


module.exports = React.createClass({

    getInitialState: function(){
        return {
        };
    },
    componentWillMount: function(){

    },
    componentDidMount: function() {
        RouteStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        RouteStore.removeChangeListener(this._onChange);

    },
    _onChange: function() {

    },


    render: function() {
        return(
            <div className="principalComment">
              <div className="col-xs-12">
                <p><span className="commentName">{this.props.comment.username}</span><span className="ago pull-right">{this.props.comment.ago}</span></p>
                <p className="commentText">{this.props.comment.content}</p>
              </div>
            </div>
        )
    }
});
