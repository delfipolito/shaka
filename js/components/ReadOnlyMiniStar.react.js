var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var ConsultantsStore             = require('../stores/ConsultantsStore');


module.exports = React.createClass({

    getInitialState: function(){
      return {
      };
    },

    componentWillMount: function(){
    },

    componentDidMount: function() {
      ConsultantsStore.addChangeListener(this._onChange);
      var id = '#' + this.props.id;
      $(id).rateYo({
        rating: this.props.valor,
        normalFill: "#B0BBC6",
        ratedFill: "#F5CF63",
        readOnly: true,
        starWidth: "20px",
        spacing: "2px",
      });
    },

    componentWillUnmount: function() {
      ConsultantsStore.addChangeListener(this._onChange);
    },
    changeRate: function () {
      var id = '#' + this.props.id;
      var $rateYo = $(id).rateYo();
      $rateYo.rateYo("destroy");
    },

    _onChange: function () {
      var id = '#' + this.props.id;
      var $rateYo = $(id).rateYo();
      $rateYo.rateYo("destroy");
      $rateYo.rateYo({
        rating: this.props.valor,
        normalFill: "#B0BBC6",
        ratedFill: "#F5CF63",
        readOnly: true,
        starWidth: "20px",
        spacing: "2px",
      });

    },

    _onSubmit: function (e) {
    },

    ratingChanged: function (newRating) {
    },


    render: function() {
      return(
        <div>
          <div id={this.props.id}></div>
        </div>

      )
    }
});
