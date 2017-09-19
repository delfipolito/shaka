  // var React                        = require('react');
  // var ReactPropTypes               = React.PropTypes;
  // var ConsultantsStore             = require('../stores/ConsultantsStore');
  // var redirect                     = require('../actions/RouteActions').redirect;
  // var getConsultant                = require('../actions/ConsultantsActions').getConsultant;
  // var getComments                  = require('../actions/ConsultantsActions').getComments;
  // var getRatings                   = require('../actions/ConsultantsActions').getRatings;
  // var Comment                      = require('./Comment.react.js');
  // var MyComment                    = require('./MyComment.react.js');
  // var MyRate                       = require('./MyRate.react.js');
  // var Rate                         = require('./Rate.react.js');


  // module.exports = React.createClass({

  // getInitialState: function(){
  //   return {
  //     menuRight: 'col-xs-6 menuRight',
  //     menuLeft:  'col-xs-6 menuLeft menuActive',
  //     commentsDiv: 'commentsContainer',
  //     rankingDiv: 'hidden',
  //     comments: [],
  //     ratings: [],
  //     otherRankings: 'col-xs-12',
  //     myRanking: 'hidden',
  //     consultant: '',
  //   };
  // },

  // componentDidMount: function() {
  //   var id = window.location.href.split('/consultant/')[1] || '';
  //   console.log(id);
  //   getConsultant(id);
  //   getComments(id);
  //   getRatings(id);
  //   ConsultantsStore.addChangeListener(this._onChange);
  // },

  // componentWillUnmount: function() {
  //   ConsultantsStore.addChangeListener(this._onChange);
  // },

  // _onChange: function() {
  //   if (this.isMounted()) {
  //     this.setState({
  //       consultant: ConsultantsStore.getConsultant(),
  //       comments: ConsultantsStore.getComments(),
  //       ratings: ConsultantsStore.getRatings().consultant_user_ratings,
  //     });
  //   }
  // },

  // seeComments:function  (argument) {
  //   this.setState({
  //     menuRight: 'col-xs-6 menuRight ',
  //     menuLeft: 'col-xs-6 menuLeft menuActive',
  //     commentsDiv: 'commentsContainer',
  //     rankingDiv: 'hidden',
  //   });
  // },

  // seeRaiting:function  (argument) {
  //   this.setState({
  //     menuRight: 'col-xs-6 menuRight menuActive',
  //     menuLeft: 'col-xs-6 menuLeft ',
  //     commentsDiv: 'hidden',
  //     rankingDiv: 'commentsContainer',
  //   });
  // },


  // render: function() {
  //   var comments    = this.state.comments;
  //   var ratings     = this.state.ratings;
  //   var allComments = [];
  //   var allRates    = [];
  //   var consultant  = this.state.consultant;
  //   console.log(consultant);

  //   for (var key in comments) {
  //     allComments.push(<Comment key={key+1} consultantId={localStorage.getItem('consultantId')} comment={comments[key]} />);
  //   }

  //   for (var key in this.state.ratings) {
  //     allRates.push(<Rate key={key} consultantId={localStorage.getItem('consultantId')} rate={this.state.ratings[key]} />);
  //   }

  //   return(
  //     <div className="consultant">
  //       <div className="col-xs-12 valign title-container">
  //         <h1 className="">{consultant.name}</h1>
  //       </div>
        
  //       <div className="infoContainer commentHeight noPadding col-xs-12">
  //         <div className={this.state.menuLeft} onClick={this.seeComments}>COMENTARIOS</div>
  //         <div className={this.state.menuRight} onClick={this.seeRaiting}>PUNTUACIONES</div>
  //         <div className={this.state.commentsDiv}>
  //           {allComments}
  //         </div>
  //         <div className={this.state.rankingDiv}>
  //           <div className="col-xs-12">{allRates}</div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  // });
