var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var Star                         = require('./ReadOnlyMiniStar.react');
var redirect                     = require('../actions/RouteActions').redirect;


module.exports = React.createClass({

  getInitialState: function(){
    return {
      rating: '',
    };
  },

  
  render: function() {
    var consultant= this.props.consultant;
    
    return(
        <div className="container myRatingContainer">
          <div className="disclaimer">
            <h1>Resumen en porcentaje de puntuaciones otorgado por los postulantes</h1>
          </div>
          <div>
            <div className="rating-item-box row">
              <div className="col-xs-6">
                <div><span className="myRatingText resume-title">Respuesta recibida por el candidato</span></div>
              </div>
              <div className="col-xs-6">
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: (consultant.consultant_rating.feedback*100/5)+'%'}}>
                  </div>
                </div>
              </div>
            </div>
            <div className="rating-item-box row">
              <div className="col-xs-6">
                <span className="myRatingText resume-title">Trato recibido por el candidato</span>
              </div>
              <div className="col-xs-6">
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: (consultant.consultant_rating.treat*100/5)+'%'}}>
                  </div>
                </div>
              </div>
            </div>
            <div className="rating-item-box row">
              <div className="col-xs-6">
                <span className="myRatingText resume-title">Aporte de valor al candidato</span>
              </div>
              <div className="col-xs-6">
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: (consultant.consultant_rating.value*100/5)+'%'}}>
                  </div>
                </div>
              </div>
            </div>
            <div className="rating-item-box row">
              <div className="col-xs-6">
                <span className="myRatingText resume-title">Calidad del proceso de búsqueda</span>
              </div>
              <div className="col-xs-6">
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: (consultant.consultant_rating.quality*100/5)+'%'}}>
                  </div>
                </div>
              </div>
            </div>
            <div className="rating-item-box row">
              <div className="col-xs-6">
                <span className="myRatingText resume-title">Infraestructura de la consultora</span>
              </div>
              <div className="col-xs-6">
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: (consultant.consultant_rating.infrastructure*100/5)+'%'}}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
});
