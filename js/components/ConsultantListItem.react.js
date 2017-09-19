var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var SessionStore                 = require('../stores/SessionStore');
var RouteStore                   = require('../stores/RouteStore');
var redirect                     = require('../actions/RouteActions').redirect;
var selectConsultant             = require('../actions/ConsultantsActions').selectConsultant;
var getComments                  = require('../actions/ConsultantsActions').getComments;
var getRatings                   = require('../actions/ConsultantsActions').getRatings;
var Link                         = require('react-router').Link;


module.exports = React.createClass({
  propTypes: {
    consultant: ReactPropTypes.object.isRequired
  },

  render: function() {
    var consultant = this.props.consultant;
    var link = '/consultant/' + consultant.id;
    return(
      
      <div className="col-md-4 col-sm-6 col-xs-12">
        <Link to={link} >
          <div className="consultantList">
            <div className="header row">
              <div className="col-xs-8">
                <h1>{this.props.consultant.name}</h1>
              </div>
              <div className="pull-right">
                <span className="raitingText">{consultant.consultant_rating.stars}</span>
                <span><i className="fa fa-star yellow-star" aria-hidden="true"></i></span>
              </div>
            </div>
            <div className="body row">
              <div className="col-xs-12">
                <p className={consultant.web_page ? '' : 'hidden'}>
                  <span className="glyphicon glyphiconPadding glyphicon-globe" aria-hidden="true"></span>
                  <a href={consultant.web} target="_blank">
                    {consultant.web_page}
                  </a>
                </p>
                <p className={consultant.phone ? '' : 'hidden'}>
                  <span className="glyphicon glyphiconPadding glyphicon-earphone" aria-hidden="true"></span>
                  {consultant.phone}
                </p>
                <p className={consultant.mail ? '' : 'hidden'}>
                  <span className="glyphicon glyphiconPadding glyphicon-envelope" aria-hidden="true"></span>
                  {consultant.mail}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
   
    )
  }
});
