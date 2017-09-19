var React 			 = require('react');
var RouteHandler = require('react-router').RouteHandler;
var SessionStore = require('../stores/SessionStore');
var NavBar			 = require('./NavBar.react');

function getStateFromStores() {
	return {isLogedIn: SessionStore.isLoggedIn()};
}

var ShakaApp = React.createClass({

	getInitialState: function() {
		return getStateFromStores();
	},

	componentDidMount: function() {
		SessionStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		SessionStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getStateFromStores());
	},

  render: function() {
    return(
    	<div id="allHeight"><NavBar/><RouteHandler/></div>
    )}
});

module.exports = ShakaApp;
