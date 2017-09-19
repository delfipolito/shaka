var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var redirect                     = require('../actions/RouteActions').redirect;
var sendCommentAction            = require('../actions/ConsultantsActions').sendComment;


module.exports = React.createClass({

  _onSubmit: function(e) {
    e.preventDefault();
    var form  = e.target.elements;
    var topic = form.comment.value;
    sendCommentAction(this.props.consultantId, topic);

    form.comment.value = '';
  },


  render: function() {

    return(
      <div className="container commmentContainer">
        <div className="disclaimer">
          <h1>Dejá tu comentario sobre la consultora</h1>
          <p>Los comentarios publicados son de exclusiva responsabilidad de sus autores y las consecuencias derivadas de ellos pueden ser pasibles de sanciones legales. Aquel usuario que incluya en sus mensajes algún comentario violatorio del reglamento será eliminado e inhabilitado para volver a comentar. Enviar un comentario implica la aceptación del Reglamento.</p>
        </div>
        <div className="myCommentContainer">
          <form onSubmit={this._onSubmit}>
            <div className="col-xs-12">
              <textarea className="commentTextArea" ref="comment" name="comment" placeholder="Comparte tu experiencia..." required></textarea>
            </div>
            <div className="col-xs-12 sendContainer">
              <button type="submit" className="sendButton">ENVIAR</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
});
