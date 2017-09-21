var React      = require('react');
var redirect   = require('../actions/RouteActions').redirect;

module.exports = React.createClass({

  getInitialState: function(){
      return {
        user: 'btn userTypeButtonActive',
        consultant: 'btn userTypeButton',
        userSelected: true,
        loginForm: "valignn 100width",
        signupForm: 'hidden',
        consultantEmail: 'hidden',
        formText: 'Todavia no tengo cuenta, quiero registrarme',
        codeClass: 'hidden',
      };
  },
  componentDidMount: function() {
    $('.autoplay').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });
  },

  render: function() {
    return(
      <div>
      <section className="how-section" id="how">
        <div className="row">
          <h1>¿Cómo funciona Shaka?</h1>
          <span className="line center-line"></span>
        </div>
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
            <div className="col-md-4 col-xs-12">
              <img className="how-img" src="./images/how1.png"/>
              <h2 className="dark-grey-title">Opiná todo lo que quieras</h2>
              <p className="grey-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.</p>
            </div>
            <div className="col-md-4 col-xs-12">
              <img className="how-img" src="./images/how2.png"/>
              <h2 className="dark-grey-title">Calificá las consultoras</h2>
              <p className="grey-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.</p>
            </div>
            <div className="col-md-4 col-xs-12">
              <img className="how-img" src="./images/how3.png"/>
              <h2 className="dark-grey-title">Consultá tus dudas</h2>
              <p className="grey-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="video-section">
        
      </section>

      <section className="info-section" id="info">
        <div className="row">
          <div className="col-xs-10 col-md-3 col-xs-offset-1 col-md-offset-1 left-aligned">
            <h3>Información para consultoras</h3>
            <span className="line left-line"></span>
            <h2 className="dark-grey-title">¿Cómo se genera un usuario de Consultora? </h2>
            <p className="grey-p">Para generar una cuenta de consultora, deberá hacer click en el recuadro “Registrate”, acceder a la pestaña “Consultora” y completar elformulario, que nos permitirá contactarlo y validar que es realmente un vocero autorizado de la compañía (ej: dueño, CEO, responsable de RRHH, de Relaciones Institucionales o de Comunicación) y así validaremos el usuario y contraseña con el cual podrá acceder a su cuenta.</p>
            <br/>
            <h2 className="dark-grey-title">¿En qué me beneficia estar registrado como consultora?</h2>
            <p className="grey-p">Podrá tener un usuario que le permitirá: registrar, editar y actualizar los datos de la consultora. Así como también responder y opinar debajo de los comentarios de los otros usuarios, como responsable de la empresa.</p>
          </div>
          <div className="col-sm-offset-0 col-md-offset-1 col-sm-12 col-md-7">
            <img src="./images/consultoras.png"/>
          </div>
        </div>
      </section>
      <section className="info-section">
        <div className="row" style={{marginBottom: '30px'}}>
          <h3>Consultoras asociadas</h3>
          <span className="line center-line-no-bottom"></span>
        </div>
        <div className="row">
          <div className="autoplay col-xs-8 col-xs-offset-2" >
            <div className="landing-consultant-item">
              <img height="50" width="50" src="./images/circulo.png"/>
            </div>
            <div>
              <img height="50" width="50" src="./images/circulo.png"/>
            </div>
            <div>
              <img height="50" width="50" src="./images/circulo.png"/>
            </div>
            <div>
              <img height="50" width="50" src="./images/circulo.png"/>
            </div>
            <div>
              <img height="50" width="50" src="./images/circulo.png"/>
            </div>
            <div>
              <img height="50" width="50" src="./images/circulo.png"/>
            </div>
          </div>
        </div>
      </section>
      <section className="how-section" id="foros">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
            <h1>¿Cómo funcionan los foros?</h1>
            <span className="line center-line-no-bottom"></span>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</h3>
          </div>
        </div>
        <div className="row">
          <img className="foros-img" src="./images/foros.png"/>
        </div>
      </section>
      <footer className="footer container">
        <div className="col-xs-10 col-xs-offset-1"> 
          <div className="col-xs-12 left-aligned">
            <h3 className="footer-title">Contactanos</h3>
            <br/>
          </div>
          <div className="col-xs-12 col-md-3 left-aligned">
            <p className="white">(011) 4503 3942</p>
            <p><a className="white" href="mailto:shakacorp@shaka.com.ar">shakacorp@shaka.com.ar</a></p>
            <p><a className="white" href="mailto:shakacorp@shaka.com.ar">shakacorp@shaka.com.ar</a></p>
          </div>
          <div className="col-xs-12 col-md-3 left-aligned redes-div">
            <a className="footer-a" href="http://www.facebook.com" target="_blank">
             <div className="footer-icon footer-facebook"></div>
            </a>
            <a className="footer-a" href="http://www.instagram.com" target="_blank">
             <div className="footer-icon footer-instagram"></div>
            </a>
            
            <a className="footer-a" href="http://www.twitter.com" target="_blank">
              <div className="footer-icon footer-twitter"></div>
            </a>
            
          </div>
          <div className="col-xs-12 col-md-3 left-aligned">
            <p><a className="white">Inicio</a></p>
            <p><a className="white">Ranking de consultoras</a></p>
            <p><a className="white">Foros</a></p>
          </div>
          <div className="col-xs-12 col-md-3 left-aligned">
            <br/>
            <br/>
            <br/>
            <p className="white">Diseño y desarrollo por <a className="white" href="http://www.vintestudio.com" target="_blank">Vinte Studio</a></p>
          </div>
        </div>
        
      </footer>
      </div>
    )
  }
});
