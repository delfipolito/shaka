var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var ConsultantsStore             = require('../stores/ConsultantsStore');


module.exports = React.createClass({
    componentDidMount: function() {
    ConsultantsStore.addChangeListener(this._onChange);
    var id = '#' + this.props.id;
    $(id).rateYo({
      rating: this.props.valor,
      normalFill: "#B0BBC6",
      ratedFill: "#F5CF63",
      starWidth: "26px",
      spacing: "3px",
    });
  },

  componentWillUnmount: function() {
    ConsultantsStore.addChangeListener(this._onChange);
  },
  changeRate: function () {
    var id = '#' + this.props.id;
    var $rateYo = $(id).rateYo();
    $rateYo.rateYo("destroy");
    $rateYo.rateYo({
      rating: this.props.valor,
      normalFill: "#B0BBC6",
      ratedFill: "#F5CF63",
      starWidth: "26px",
      spacing: "3px",
    });
  },

  _onChange: function () {
    var id = '#' + this.props.id;
    var $rateYo = $(id).rateYo();
    $rateYo.rateYo("destroy");
    $rateYo.rateYo({
      rating: this.props.valor,
      normalFill: "#B0BBC6",
      ratedFill: "#F5CF63",
      starWidth: "20px",
      spacing: "3px",
    });

  },

  _onSubmit: function (e) {
  },

  ratingChanged: function (newRating) {
  },


  render: function() {

    var id = '#' + this.props.id;
    var $rateYo = $(id).rateYo();
    $rateYo.rateYo("destroy");
    $rateYo.rateYo({
      rating: this.props.valor,
      normalFill: "#B0BBC6",
      ratedFill: "#F5CF63",
      starWidth: "26px",
      spacing: "3px",
    });

    return(
      <div>
        <div id={this.props.id} className="rate-star"></div>
      </div>

    )
  }
});
