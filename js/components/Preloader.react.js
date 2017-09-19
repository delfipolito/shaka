var React                        = require('react');

module.exports = React.createClass({

    render: function() {
      var preloaderClass = '';
      if (this.props.preloaderClass) {
        preloaderClass = this.props.preloaderClass + ' ';
      }
      if ('mini' == this.props.size) {
        preloaderClass += 'loader-mini';
      } else if ('medium' == this.props.size) {
        preloaderClass += 'loader-medium';
      } else if ('white-medium' == this.props.size) {
        preloaderClass += 'white-medium loader';
      } else {
        preloaderClass += 'loader';
      }
      return (
        <div className={preloaderClass}>Loading...</div>
      );
    }
});