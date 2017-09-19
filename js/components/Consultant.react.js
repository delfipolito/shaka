var React                        = require('react');
var ReactPropTypes               = React.PropTypes;
var SessionStore                 = require('../stores/SessionStore');
var RouteStore                   = require('../stores/RouteStore');
var ConsultantsStore             = require('../stores/ConsultantsStore');
var redirect                     = require('../actions/RouteActions').redirect;
var getComments                  = require('../actions/ConsultantsActions').getComments;
var getRatings                   = require('../actions/ConsultantsActions').getRatings;
var getConsultant                = require('../actions/ConsultantsActions').getConsultant;
var Comment                      = require('./Comment.react.js');
var MyComment                    = require('./MyComment.react.js');
var MyRate                       = require('./MyRate.react.js');
var Rate                         = require('./Rate.react.js');
var Star                         = require('./ReadOnlyStar.react');
var RateResume                   = require('./RateResume.react');
var Preloader                    = require('./Preloader.react');


module.exports = React.createClass({

  getInitialState: function(){
    return {
      menuRight: 'menuRight',
      menuLeft:  'menuLeft menuActive',
      commentsDiv: 'col-xs-12',
      rankingDiv: 'hidden',
      comments: [],
      ratings: [],
      myRanking: '',
    };
  },
  componentDidMount: function() {
    RouteStore.addChangeListener(this._onChange);
    SessionStore.addChangeListener(this._onChange);
    ConsultantsStore.addChangeListener(this._onChange);
    var id = window.location.href.split('/consultant/')[1] || '';
    getConsultant(id);
    getComments(id);
    getRatings(id);
  },

  componentWillUnmount: function() {
    RouteStore.removeChangeListener(this._onChange);
    SessionStore.addChangeListener(this._onChange);
    ConsultantsStore.addChangeListener(this._onChange);

  },
  _onChange: function() {
    if (this.isMounted()) {
      this.setState({
        consultant: ConsultantsStore.getConsultant(),
        comments: ConsultantsStore.getComments(),
        ratings: ConsultantsStore.getRatings().consultant_user_ratings,
      });
    }
  },
  goToMyRanking: function () {
    this.setState({
      rankingDiv: 'col-xs-12',
    });

  },

  goToOthersRanking: function () {
    this.setState({
      rankingDiv: 'col-xs-12',
    });
    $('#othersRates').scrollTop();
  },
  seeComments:function  (argument) {
    this.setState({
      menuRight: 'menuRight ',
      menuLeft: 'menuLeft menuActive',
      commentsDiv: 'col-xs-12',
      rankingDiv: 'hidden',
    });
  },
  seeRaiting:function  (argument) {
    this.setState({
      menuRight: 'menuRight menuActive',
      menuLeft: 'menuLeft ',
      commentsDiv: 'hidden',
      rankingDiv: 'col-xs-12',
    });
  },


  render: function() {

    var consultant  = this.state.consultant;
    if (!consultant) {
      return (
        <div className="allConsultantsContainer valign-wrapper container">
          <div className="col-xs-12 sideList">
            <div className="row"><Preloader/></div>
          </div>
        </div>
      );
    }
    console.log(consultant);
    var comments     = this.state.comments;
    var ratings      = this.state.ratings;
    var allComments1 = [];
    var allComments2 = [];
    var allComments3 = [];
    var allRates     = [];
    if(SessionStore.isLoggedIn()){
      var rankingButtonDiv = 'col-xs-12 pull-right rankingButtonContainer'
    }else{
      var rankingButtonDiv = 'hidden';
    }
    var cont = 1;
    var boxes = [];
    for (var key in comments) {
      boxes.push(<Comment key={key+1} consultantId={this.state.consultant.id} comment={comments[key]} />);
    }

    for (var key in this.state.ratings) {
      var id='rating'+key;
      allRates.push(<Rate key={key} consultantId={this.state.consultant.id} id={id} rate={this.state.ratings[key]} />);
    }
    var info_rating = ''
    if (consultant) {
      var id1 = (consultant.id)*10 + 1;
      info_rating = (
        <div className="star-aligment"><Star id={id1} name={id1} valor={consultant.consultant_rating.stars}/></div>
      );
    }

    if(this.state.myRanking!='hidden'){
      var my = 'col-xs-12';
    }else{
      var my = 'hidden';
    }

    return(
      <div className="consultantContainer consultant">
        <div className="col-xs-12 valign title-container">
          <span className="inline-flex"><h1 className="">{consultant.name}</h1><h1>{info_rating}</h1></span>
        </div>
        <div className={SessionStore.isLoggedIn() ? 'col-xs-12 action-container' : 'hidden'}>
          <MyRate consultantId={this.state.consultant.id} />
          {SessionStore.isLoggedIn() ? <MyComment key={0} consultantId={this.state.consultant.id} /> : ''}
        </div>
        <div className="col-xs-12 title-container">
          <h2>Experiencias de los candidatos con {consultant.name}</h2>
        </div>
        <div className="col-xs-12 title-container">
          <div className={this.state.menuLeft} onClick={this.seeComments}>COMENTARIOS</div>
          <div className={this.state.menuRight} onClick={this.seeRaiting}>PUNTUACIONES</div>
        </div>
        <div className="col-xs-12 action-container">
          <div className={this.state.commentsDiv}>
            <div className="flex-container">{boxes}</div>
          </div>
          <div className={this.state.rankingDiv}>
            <RateResume consultant={consultant} />
            <div className="container myRatingContainer" style={{backgroundColor: '#F7F7F7'}}>
              <div className="disclaimer" style={{borderBottom: 'solid 1px #ccc'}}>
                <h1>Puntuaciones generales de cada candidato</h1>
              </div>
              <div className="col-xs-12">{allRates}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
