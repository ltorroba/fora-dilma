'use strict';

var React = require('react-native');
var {
	Text,
	View,
	Component
} = React;

import styles from './styles';
var HelperFunctions = require('./HelperFunctions');

class PressCounter extends Component {
	constructor() {
		super();
		this.state = {
			queuedPresses: 0,
			lastPressBatch: 0,
			localPresses: 0,
			presses: 0,
			presses_artificial: 0,
			lastUpdate: 0
		}
	}

	componentWillMount() {
		setInterval(this.performArtificialTick, 200, this);
	}

	performArtificialTick(scope) {
		// Calculate how many Ticks To Go - waypoint set 0ms after theoretical next update
		var ttg = (scope.state.lastUpdate + 3000 - Date.now()) / 200;

		// Update artificial state
		let newState = {...scope.state};

		var presses_artificial_average = ttg >= 1 ? (newState.presses - newState.presses_artificial) / ttg : newState.presses - newState.presses_artificial;
		var artificial_increment = Math.floor(Math.random() * 2 + presses_artificial_average - 1);
		
		artificial_increment = artificial_increment > 0 ? artificial_increment : 0;

		newState.presses_artificial += newState.presses_artificial < newState.presses ? artificial_increment : 0;

		scope.setState(newState);
	}

	render() {
		return (
			<Text style={styles.hitsText}>
                { HelperFunctions.prettifyNumber(this.state.presses_artificial + this.state.localPresses) }
            </Text>
		);
	}
}

module.exports = PressCounter;