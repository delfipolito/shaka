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
            <div className="principalComment col-xs-12">
              <div className="col-xs-2">
                <img src="./images/man.png" height="30" width="30" className="img-circle pull-right"/>
              </div>
              <div className="col-xs-10">
                <div className="row">
                  <p><span className="commentName">{this.props.comment.username}</span><span className="ago pull-right">{this.props.comment.ago}</span></p>
                </div>
                <div className="row">
                  <div className="col-xs-10 noPadding">
                    <p className="commentText">{this.props.comment.content}</p>
                  </div>
                  <div className="col-xs-2 pull-right">
                    <button className="miniDeleteButton" onClick={this.delete}><span className="buttonIcon trashIcon glyphicon glyphiconPadding glyphicon-trash noPadding" aria-hidden="true"></span></button>
                    <button className="miniAproveButton" onClick={this.aprove}><span className="buttonIcon okIcon glyphicon glyphiconPadding glyphicon-ok noPadding" aria-hidden="true"></span></button>
                  </div>
                </div>
              </div>

            </div>
        )
    }
});
