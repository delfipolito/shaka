var React               = require ('react');
var Router              = require ('react-router');
var Route               = Router.Route;
var ShakaApp            = require ('./components/ShakaApp.react');
var Landing             = require ('./components/Landing.react');
var Login               = require ('./components/Landing.react');
var AllConsultants      = require ('./components/AllConsultants.react');
var AdminPanel          = require ('./components/AdminPanel.react');
var ConsultantProfile   = require ('./components/Consultant.react');
var DefaultRoute        = Router.DefaultRoute;


var routes = (
  <Route handler={ShakaApp} path="/" location="hash">
    <Route name="profile" path='/home' handler={Landing}/>
    <Route name="login" path='/login' handler={Landing}/>
    <Route name="allConsultants" path='/all_consultants' handler={AllConsultants}/>
    <Route name="adminPanel" path='/admin_panel' handler={AdminPanel}/>
    <Route name="consultantProfile" path='/consultant_profile' handler={ConsultantProfile}/>
    <Route name="consultant" path='/consultant/:id' handler={ConsultantProfile}/>
    <DefaultRoute handler={Landing}/>
  </Route>
);

module.exports = routes;
