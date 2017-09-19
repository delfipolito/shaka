var React                        = require('react');
var SessionStore                 = require('../stores/SessionStore');
var RouteStore                   = require('../stores/RouteStore');
var redirect                     = require('../actions/RouteActions').redirect;


module.exports = React.createClass({

    getInitialState: function(){
        return {
        };
    },
    componentWillMount: function(){

    },
    componentDidMount: function() {
        RouteStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        RouteStore.removeChangeListener(this._onChange);

    },
    _onChange: function() {

    },


    render: function() {



        return(
            <div className="containerr container">
                chau
            </div>
        )
    }
});
