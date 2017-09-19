var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var RouteStore                   = require('../stores/RouteStore');
var SessionStore                 = require('../stores/SessionStore');
var redirect                     = require('../actions/RouteActions').redirect;
var Star                         = require('./ReadOnlyMiniStar.react');


module.exports = React.createClass({

  render: function() {
    return(
      <div className="col-xs-4">
        <div className="rating-container valign-wrapper">
          <div className="col-xs-6 col-xs-offset-1 valign-wrapper">
            <img src="./images/man.png" height="50" width="50" className="img-circle"/>
            <p style={{margin: '0 15px'}}><span className="commentName">{this.props.rate.username}</span><span className="ago pull-right">{this.props.rate.ago}</span></p>
          </div>
          <div className="col-xs-4 ">
            <Star id={this.props.id} name={this.props.id} valor={this.props.rate.stars}/>
          </div>
        </div>
      </div>
    )
  }
});
