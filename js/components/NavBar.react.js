var React                        = require('react');
var SessionStore                 = require('../stores/SessionStore');
var RouteStore                   = require('../stores/RouteStore');
var redirect                     = require('../actions/RouteActions').redirect;
var logout                       = require('../actions/ServerActions').logout;
var Navbar                       = require('react-bootstrap').Navbar;
var CollapsibleNav               = require('react-bootstrap').CollapsibleNav;
var NavItem                      = require('react-bootstrap').NavItem;
var NavDropdown                  = require('react-bootstrap').NavDropdown;
var MenuItem                     = require('react-bootstrap').MenuItem;
var Nav                          = require('react-bootstrap').Nav;
var DropdownButton               = require('react-bootstrap').DropdownButton;


module.exports = React.createClass({


    getInitialState: function(){
      var dropdown = '';
      if(SessionStore.isLoggedIn()){
        if(localStorage.getItem("isAdmin")== 'true'){
          dropdown = (
            <NavDropdown eventKey={4} title={localStorage.getItem('username')} className="btnLanding navButton loginButton " id="basic-nav-dropdown">
              <MenuItem className="menuitem" eventKey="1" onSelect={this.onClickAdminPanel}>Panel de administración</MenuItem>
              <MenuItem className="menuitem" eventKey="2" onSelect={this.onClickLogOut}>Cerrar sesión</MenuItem>
              <MenuItem className="menuitem" divider />
              <MenuItem className="menuitem" eventKey="3" >Preguntas frecuentes</MenuItem>
              <MenuItem className="menuitem" eventKey="4">Términos y condiciones</MenuItem>
            </NavDropdown>
          );
        }else if( localStorage.getItem("consultantUser")=="true"){
          dropdown = (
            <NavDropdown eventKey={4} title={localStorage.getItem('username')} className="btnLanding navButton loginButton " id="basic-nav-dropdown">
              <MenuItem className="menuitem" eventKey="1" onSelect={this.onClickConsultantProfile}>Perfil</MenuItem>
              <MenuItem className="menuitem" eventKey="2" onSelect={this.onClickLogOut}>Cerrar sesión</MenuItem>
              <MenuItem className="menuitem" divider />
              <MenuItem className="menuitem" eventKey="3" >Preguntas frecuentes</MenuItem>
              <MenuItem className="menuitem" eventKey="4">Términos y condiciones</MenuItem>
            </NavDropdown>
          );
        }else{
          dropdown = (
            <NavDropdown eventKey={4} title={localStorage.getItem('username')} className="btnLanding navButton loginButton " id="basic-nav-dropdown">
              <MenuItem className="menuitem" eventKey="2" onSelect={this.onClickLogOut}>Cerrar sesión</MenuItem>
              <MenuItem className="menuitem" divider />
              <MenuItem className="menuitem" eventKey="3" >Preguntas frecuentes</MenuItem>
              <MenuItem className="menuitem" eventKey="4">Términos y condiciones</MenuItem>
            </NavDropdown>
          );
        }
      }
      return {
        dropdown: dropdown
      };

    },
    componentWillMount: function(){

    },
    onClickLogOut: function(){
      logout();
    },

    profileButton: function() {
      localStorage.setItem('openModal', false);
      redirect('profile');
    },

    componentDidMount: function() {
        RouteStore.addChangeListener(this._onChange);
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        RouteStore.removeChangeListener(this._onChange);
        SessionStore.addChangeListener(this._onChange);

    },
    _onChange: function () {
      if(SessionStore.isLoggedIn()){
        var dropdown = (
          <NavDropdown eventKey={4} title={localStorage.getItem('username')} className="btnLanding navButton loginButton " id="basic-nav-dropdown">
            <MenuItem className="menuitem" eventKey="2" onSelect={this.onClickLogOut}>Cerrar sesión</MenuItem>
            <MenuItem className="menuitem" divider />
            <MenuItem className="menuitem" eventKey="3" >Preguntas frecuentes</MenuItem>
            <MenuItem className="menuitem" eventKey="4">Términos y condiciones</MenuItem>
          </NavDropdown>
        );

        if(localStorage.getItem("isAdmin")== 'true'){
          dropdown = (
            <NavDropdown eventKey={4} title={localStorage.getItem('username')} className="btnLanding navButton loginButton " id="basic-nav-dropdown">
              <MenuItem className="menuitem" eventKey="1" onSelect={this.onClickAdminPanel}>Panel de administración</MenuItem>
              <MenuItem className="menuitem" eventKey="2" onSelect={this.onClickLogOut}>Cerrar sesión</MenuItem>
              <MenuItem className="menuitem" divider />
              <MenuItem className="menuitem" eventKey="3" >Preguntas frecuentes</MenuItem>
              <MenuItem className="menuitem" eventKey="4">Términos y condiciones</MenuItem>
            </NavDropdown>
          );
        }else if( localStorage.getItem("consultantUser")=="true"){
          dropdown = (
            <NavDropdown eventKey={4} title={localStorage.getItem('username')} className="btnLanding navButton loginButton " id="basic-nav-dropdown">
              <MenuItem className="menuitem" eventKey="1" onSelect={this.onClickConsultantProfile}>Perfil</MenuItem>
              <MenuItem className="menuitem" eventKey="2" onSelect={this.onClickLogOut}>Cerrar sesión</MenuItem>
              <MenuItem className="menuitem" divider />
              <MenuItem className="menuitem" eventKey="3" >Preguntas frecuentes</MenuItem>
              <MenuItem className="menuitem" eventKey="4">Términos y condiciones</MenuItem>
            </NavDropdown>
          );
        }

        this.setState({
          dropdown: dropdown
        });
      }

      

    },
    login: function () {
      redirect('profile');
      localStorage.setItem('openModal', true);
      SessionStore.openLoginModal();
    },
    onClickAdminPanel: function () {
      redirect('adminPanel');
    },
    onClickConsultantProfile: function () {
      redirect('consultantProfile');
    },

    render: function() {
      if(localStorage.getItem("isAdmin")== 'true'){
        return (
          <Navbar expanded={false} brand={<img  className="navLogo" src="images/logo.png" onClick={this.profileButton} />} toggleNavKey={0}>
            <Nav right eventKey={0} >
              <NavItem eventKey={1} href="#/home#how">Cómo funciona</NavItem>
              <NavItem eventKey={2} href="#">Consultoras</NavItem>
              <NavItem eventKey={3} href="/home#foros">Foro</NavItem>
              <NavItem eventKey={4} href="#">Contacto</NavItem>
              {this.state.dropdown}
            </Nav>
          </Navbar>
        )
      }else{
        return (
          <Navbar expanded={false} brand={<img  className="navLogo valign-wrapper" src="images/logo.png" onClick={this.profileButton} />} toggleNavKey={0}>
            <Nav right eventKey={0} >
              <NavItem eventKey={1} href="#/home#how">Cómo funciona</NavItem>
              <NavItem eventKey={2} href="#">Consultoras</NavItem>
              <NavItem eventKey={3} href="/home#foros">Foro</NavItem>
              <NavItem eventKey={4} href="#">Contacto</NavItem>
              <NavItem eventKey={5} href="#">
                {SessionStore.isLoggedIn() ? this.state.dropdown : <button className="btnLanding navButton valign loginButton" onClick={this.login}>Iniciá sesion</button>}
              </NavItem>
            </Nav>
          </Navbar>
        )
      }

    }
});
