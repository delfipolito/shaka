var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var RouteStore                   = require('../stores/RouteStore');
var ConsultantsStore             = require('../stores/ConsultantsStore');
var Star                         = require('./Star.react');
var redirect                     = require('../actions/RouteActions').redirect;
var sendRatingAction             = require('../actions/ConsultantsActions').sendRating;


module.exports = React.createClass({

  getInitialState: function(){
    return {
      rating: '',
      feedback: 0
    };
  },

  componentDidMount: function() {
    RouteStore.addChangeListener(this._onChange);
    ConsultantsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RouteStore.removeChangeListener(this._onChange);
    ConsultantsStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    if (this.isMounted()) {
      // this.setState({
      //     rating: ConsultantsStore.getRatings().consultant_current_user_rating,
      //     feedback: ConsultantsStore.getRatings().consultant_current_user_rating.feedback,
      // });
    }
  },
  _onSubmit: function (e) {
    e.preventDefault();

    var consultant_rating = {};
    consultant_rating.feedback       = $("#feedback").rateYo().rateYo("rating");
    consultant_rating.treat          = $("#treat").rateYo().rateYo("rating");
    consultant_rating.value          = $("#value").rateYo().rateYo("rating");
    consultant_rating.quality        = $("#quality").rateYo().rateYo("rating");
    consultant_rating.infrastructure = $("#infrastructure").rateYo().rateYo("rating");

    sendRatingAction(this.props.consultantId, consultant_rating);

    ConsultantsStore.emitChange();
  },


  render: function() {
    var feedback= 0;
    var treat= 0;
    var value= 0;
    var quality= 0;
    var infrastructure= 0;
    if(this.state.rating!='' && this.state.rating!=null){
      feedback= this.state.rating.feedback;
      treat= this.state.rating.treat;
      value= this.state.rating.value;
      quality= this.state.rating.quality;
      infrastructure= this.state.rating.infrastructure;

    }
    return(
        <div className="container myRatingContainer">
          <div className="disclaimer">
            <h1>Calificá a la consultora teniendo en cuenta los siguientes items</h1>
          </div>
          <div>
            <div className="rating-item-box row">
              <div className="col-xs-10">
                <span className="myRatingText">Respuesta recibida por el candidato</span>
                <span className="myRatingSubtext">En este tópico se deben considerar la rapidez de la devolución sobre la entrevista inicial, si tuvo respuesta a sus correos y/o llamados y si le avisaron del final del proceso de búsqueda en caso de que no haya sido seleccionado.</span>
              </div>
              <div className="col-xs-2">
                <Star id={"feedback"} name={"feedback"} valor={this.state.rating.feedback}/>
              </div>
            </div>
            <div className="rating-item-box row">
              <div className="col-xs-10">
                <span className="myRatingText">Trato recibido por el candidato</span>
                <span className="myRatingSubtext">En este tópico se valora su percepción sobre los modales y/o amabilidad de la persona que lo contactó y/o entrevistó. También si ud. percibió un esfuerzo de la consultora por brindarle su mejor servicio y si piensa que el contenido de la entrevista fue suficiente para evaluar su potencial.</span>
              </div>
              <div className="col-xs-2">
                <Star id={"treat"} name={"treat"} valor={treat}/>
              </div>
            </div>
            <div className="rating-item-box row">
              <div className="col-xs-10">
                <span className="myRatingText">Aporte de valor al candidato</span>
                <span className="myRatingSubtext">En este tópico se valora si percibió que la consultora tuviera un claro entendimiento de los intereses y restricciones que tiene ud. como candidato y si le brindaron orientación acerca de si su expectativa económica se ajusta o no a la oferta de la empresa.</span>
              </div>
              <div className="col-xs-2">
                <Star id={"value"} name={"value"} valor={value}/>
              </div>
            </div>
            <div className="rating-item-box row">
              <div className="col-xs-10">
                <span className="myRatingText">Calidad del proceso de búsqueda</span>
                <span className="myRatingSubtext">En este tópico se valora la facilidad de uso de las herramientas para postularse (página web o formulario o envío de CV por e-mail, etc), la claridad con la que se desarrolla el proceso de búsqueda y si es considera adecuada la frecuencia con la que la consultora lo contactó para comentarle el avance de la búsqueda.</span>
              </div>
              <div className="col-xs-2">
                <Star id={"quality"} name={"quality"} valor={quality}/>
              </div>
            </div>
            <div className="rating-item-box row">
              <div className="col-xs-10">
                <span className="myRatingText">Infraestructura de la consultora</span>
                <span className="myRatingSubtext">En este tópico se valora el aspecto profesional del lugar físico donde lo citó la consultora, la percepción sobre la profesionalidad de la página web de la consultora y/o la posibilidad de optar por diversas herramientas para postularse en una búsqueda (formulario web, e-mail, etc.).</span>
              </div>
              <div className="col-xs-2">
                <Star id={"infrastructure"} name={"infrastructure"} valor={infrastructure}/>
              </div>
            </div>
          </div>
          <div className="col-xs-12 sendContainer">
            <button onClick={this._onSubmit} className="sendButton">ENVIAR</button>
          </div>
        </div>
    )
  }
});
