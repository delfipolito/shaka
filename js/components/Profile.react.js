var React                        = require('react');
var SessionStore                 = require('../stores/SessionStore');
var RouteStore                   = require('../stores/RouteStore');
var redirect                     = require('../actions/RouteActions').redirect;
var getAllConsultants            = require('../actions/ConsultantsActions').getAllConsultants;
var getConsultants               = require('../actions/ConsultantsActions').getConsultants;
var loginAction                  = require('../actions/SessionActions').login;
var consultAction                = require('../actions/SessionActions').consult;
var signupAction                 = require('../actions/SessionActions').signup;
var loginConsultant              = require('../actions/SessionActions').loginConsultant;
var LandingSections              = require('./LandingSections.react.js');

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
    componentWillMount: function(){

    },
    componentDidMount: function() {
        RouteStore.addChangeListener(this._onChange);
        SessionStore.addChangeListener(this._onChange);
        if(localStorage.getItem('openModal')=='true'){
          localStorage.setItem('openModal', false);
          SessionStore.openLoginModal();
        }
    },

    componentWillUnmount: function() {
        RouteStore.removeChangeListener(this._onChange);
        SessionStore.addChangeListener(this._onChange);

    },
    _onChange: function() {
      var codeError = RouteStore.getCodeError();
      if(codeError>=300){
        var textError = RouteStore.getTextError();
        this.setState({
          codeError: codeError,
          codeClass: 'alert alert-danger alert-dismissible',
          textError: textError
        });
      }
        if(SessionStore.getLoginModal()){
          $('#loginModal').modal()
        }else{
          $('#loginModal').modal('hide')
        }
    },

    _onSubmit: function(e) {
      e.preventDefault();
      this.setState({
        codeError: '',
        codeClass: 'hidden',
        textError: ''
      });
      var search_consultant = {};
      var form       = e.target.elements;
      search_consultant.with_name_including = form.search.value;
      if(search_consultant.with_name_including!=null && search_consultant.with_name_including!= ''){
        localStorage.setItem("search", search_consultant.with_name_including);
        //getConsultants(search_consultant);
      }else{
        localStorage.setItem("search", '');
        //getAllConsultants();
      }
      redirect('allConsultants');

    },

    seeRanking: function() {
      localStorage.setItem("search", '');
      redirect('allConsultants');
    },

    _onSubmitLogin: function (e) {
      e.preventDefault();
        var user  = {};
        var form  = e.target.elements;

        user.email_or_username  = form.email.value;
        user.password = form.password.value;
        if(this.state.userSelected){
          loginAction(user);
        }else{
          var consultant_director = {};
          consultant_director.email = form.email.value;
          consultant_director.password = form.password.value;
          loginConsultant(consultant_director);

        }

    },

    _onSubmitSignUp: function (e) {
      e.preventDefault();
        var user  = {};
        var form  = e.target.elements;

        user.username = form.usernameSignup.value;
        user.email    = form.emailSignup.value;
        user.password = form.passwordSignup.value;
        user.password_confirmation = form.passwordSignup.value;

        signupAction(user);

    },
    _onSubmitConsultantEmail: function (e) {
      e.preventDefault();
        var consult  = {};
        var form  = e.target.elements;

        consult.sender_name = form.nameConsultantE.value;
        consult.sender_email    = form.emailConsultantE.value;
        consult.content = form.areaConsultantE.value;

        consultAction(consult);

    },
    closeModal: function () {
      this.setState({
        codeError: '',
        codeClass: 'hidden',
        textError: ''
      });
      var codeError = RouteStore.setCodeError(200);
      SessionStore.setLoginModal(false);
    },
    onClickUser: function (e) {
      e.preventDefault();
      this.setState({
        codeError: '',
        codeClass: 'hidden',
        textError: '',
        user: 'btn userTypeButtonActive',
        consultant: 'btn userTypeButton',
        userSelected: true,
        formText: 'Todavia no tengo cuenta, quiero registrarme',
      });
      var codeError = RouteStore.setCodeError(200);
    },
    onClickConsultant: function(e){
      e.preventDefault();
      this.setState({
        codeError: '',
        codeClass: 'hidden',
        textError: '',
        user: 'btn userTypeButton',
        consultant: 'btn userTypeButtonActive',
        userSelected: false,
        formText: 'Si sos una consultora y queres tener un usuario, hacé click aqui.',
      });
      var codeError = RouteStore.setCodeError(200);
    },
    signUpForm: function () {
      if(this.state.userSelected){
        this.setState({
          signupForm: "valignn 100width",
          loginForm: 'hidden',
          consultantEmail: 'hidden',

        });
      }else{
        this.setState({
          consultantEmail: "valignn 100width",
          loginForm: 'hidden',
          signupForm: 'hidden',

        });
      }

    },
    deleteError: function () {
      this.setState({
        codeError: '',
        codeClass: 'hidden',
        textError: ''
      });
      var codeError = RouteStore.setCodeError(200);
      console.log("delete", this.state.codeError, this.state.codeClass, this.state.textError);
    },

    loginForm: function () {
      this.setState({
        signupForm: "hidden",
        loginForm: 'valignn 100width',
        consultantEmail: 'hidden',
      });
    },
    render: function() {
      return(
        <div>
          <div className="profileContainer valign-wrapper container">
              <div className="valign barwidth">
                <form onSubmit={this._onSubmit}>
                  <div className="whitebox col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                    <div className="col-xs-12 centered">
                      <p className="principal-title">Buscá cualquier consultora. Puntuá, comentá, y enterate que opiniones tienen los usuarios al respecto</p>
                    </div>
                    <div className="col-xs-12 valign-wrapper">
                      <div className="input-group landing-search">
                        <input type="text" className="form-control inputSearch" name="search" ref="search" placeholder="Buscar consultora..."/>
                        <span className="input-group-btn">
                          <button className="btn btn-default searchButton" type="submit" >Buscar</button>
                        </span>
                      </div>
                      <button className="btn btn-default rankingButton" type="button" onClick={this.seeRanking}>Ver ranking de consultoras</button>
                      
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog " role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body valign-wrapper">

                        <form onSubmit={this._onSubmitLogin} className={this.state.loginForm}>
                          <div className={this.state.codeClass} role="alert">
                            <button type="button" className="close" onClick={this.deleteError}><span aria-hidden="true">&times;</span></button>
                            {this.state.textError}
                          </div>
                          <button type="submit" className={this.state.user} onClick={this.onClickUser}>Usuario</button>
                          <button type="submit" className={this.state.consultant} onClick={this.onClickConsultant}>Consultora</button>
                          <div className="form-group loginRow">
                            <label className="loginLabel" htmlFor="exampleInputEmail1">Correo electronico</label>
                            <input type="email" ref="email" name="email" className="loginInput" id="email" required/>
                          </div>
                          <div className="form-group loginRow">
                            <label className="loginLabel" htmlFor="exampleInputPassword1">Contraseña</label>
                            <input type="password" ref="password" name="password" className="loginInput" id="password" required/>
                          </div>

                          <button type="submit" className="btn btn-default loginSendButton">Ingresar</button>
                          <div className="col-xs-12"><p className="signUpText" onClick={this.signUpForm}>{this.state.formText}</p></div>
                        </form>
                        <form onSubmit={this._onSubmitSignUp} className={this.state.signupForm}>
                            <div className={this.state.codeClass}>{this.state.textError}</div>
                            <div className="col-xs-12"><p className="signUpText" onClick={this.loginForm}>← volver</p></div>
                            <div className="form-group loginRow">
                              <label className="loginLabel" htmlFor="exampleInputEmail1">Nombre de usuario</label>
                              <input type="text" ref="usernameSignup" name="usernameSignup" className="loginInput" id="usernameSignup" required/>
                            </div>
                            <div className="form-group loginRow">
                              <label className="loginLabel" htmlFor="exampleInputEmail1">Correo electronico</label>
                              <input type="email" ref="emailSignup" name="emailSignup" className="loginInput" id="emailSignup" required/>
                            </div>
                            <div className="form-group loginRow">
                              <label className="loginLabel" htmlFor="exampleInputPassword1">Contraseña</label>
                              <input type="password" ref="passwordSignup" name="passwordSignup" className="loginInput" id="passwordSignup" required/>
                            </div>

                            <button type="submit" className="btn btn-default loginSendButton">Registrarme</button>
                        </form>
                        <form onSubmit={this._onSubmitConsultantEmail} className={this.state.consultantEmail}>
                            <div className={this.state.codeClass}>{this.state.textError}</div>
                            <div className="col-xs-12"><p className="signUpText" onClick={this.loginForm}>← volver</p></div>
                            <div className="form-group loginRow">
                              <label className="loginLabel" htmlFor="exampleInputEmail1">Nombre</label>
                              <input type="text" ref="nameConsultantE" name="nameConsultantE" className="loginInput" id="nameConsultantE" required/>
                            </div>
                            <div className="form-group loginRow">
                              <label className="loginLabel" htmlFor="exampleInputEmail1">Correo electronico</label>
                              <input type="email" ref="emailConsultantE" name="emailConsultantE" className="loginInput" id="emailConsultantE" required/>
                            </div>
                            <div className="form-group loginRow">
                              <label className="loginLabel" htmlFor="exampleInputPassword1">Contenido</label>
                              <textarea className="form-control" rows="3" ref="areaConsultantE" name="areaConsultantE" className="loginArea" id="areaConsultantE" required></textarea>
                          </div>

                            <button type="submit" className="btn btn-default loginSendButton">Enviar</button>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <LandingSections/>
        </div>
      )
    }
});
