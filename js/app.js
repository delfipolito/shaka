var React = require('react');
var router = require('./router').getRouter();
window.React = React;

router.run(function (Handler, state) {
	React.render(
		<Handler />,
		document.getElementById('shakaapp')
	);
})

