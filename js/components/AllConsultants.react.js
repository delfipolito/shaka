var React                        = require('react');
var SessionStore                 = require('../stores/SessionStore');
var RouteStore                   = require('../stores/RouteStore');
var ConsultantsStore             = require('../stores/ConsultantsStore');
var redirect                     = require('../actions/RouteActions').redirect;
var ConsultantListItem           = require('./ConsultantListItem.react');
var getMoreConsultants           = require('../actions/ConsultantsActions').getMoreConsultants;
var Preloader                    = require('./Preloader.react');

var getAllConsultants            = require('../actions/ConsultantsActions').getAllConsultants;
var getConsultants               = require('../actions/ConsultantsActions').getConsultants;
var selectConsultant             = require('../actions/ConsultantsActions').selectConsultant;


module.exports = React.createClass({

    getInitialState: function(){
      return {
        consultants: '',
      };
    },
    componentWillMount: function(){

    },
    componentDidMount: function() {
      RouteStore.addChangeListener(this._onChange);
      SessionStore.addChangeListener(this._onChange);
      ConsultantsStore.addChangeListener(this._onChange);
      if (localStorage.getItem("search")!='') {
        getConsultants();
      } else {
        getAllConsultants();
      }
    },

    componentWillUnmount: function() {
      RouteStore.removeChangeListener(this._onChange);
      SessionStore.addChangeListener(this._onChange);
      ConsultantsStore.addChangeListener(this._onChange);

    },
    _onChange: function() {
      var consultants = ConsultantsStore.getConsultants();
      var pagination  = ConsultantsStore.getPagination();
      var loadMore = '';

      if (pagination.current_page < pagination.total_pages) {
        loadMore = (
          <div className="row centered">
            <button className="loadMoreButton" onClick={this.nextPage}>CARGAR MAS CONSULTORAS</button>
          </div>);
      }
      this.setState({
        consultants: consultants,
        pagination: pagination,
        loadMore: loadMore
      });
    },

    nextPage: function(){
      if(this.state.pagination.current_page < this.state.pagination.total_pages){
        getMoreConsultants(parseInt(this.state.pagination.current_page) + 1);
      }
    },


    render: function() {
      if (!this.state.consultants) {
        return(
          <div className="allConsultantsContainer valign-wrapper container">
            <div className="col-xs-12 sideList">
              <div className="row"><Preloader/></div>
            </div>
          </div>
        )
      }

      var consultants = this.state.consultants;
      var allConsultantsList = [];

      for (var key in consultants) {
        var marked = false;
        if(this.state.courrentConsultant != '' && this.state.courrentConsultant!= null && consultants[key].id == this.state.courrentConsultant.id){
          marked = true;
        }
        allConsultantsList.push(<ConsultantListItem key={key} marked={marked} consultant={consultants[key]} selectConsultant={this.selectConsultant}/>);
      }
      return(
        <div className="allConsultantsContainer valign-wrapper container">
          <div className="col-xs-12 sideList">
            <div className="row">{allConsultantsList}</div>
            {this.state.loadMore}
          </div>
        </div>
      )
    }
});
