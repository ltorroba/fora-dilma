'use strict';

var React = require('react-native');
var {
	Component,
	Image,
	Text,
	Dimensions,
	View
} = React;

import styles from './styles';
var ArrowButton = require('./ArrowButton.js');
var HelperFunctions = require('./HelperFunctions');

var { height, width } = Dimensions.get('window');

class Statistics extends Component {
	constructor() {
		super();

		this.state = {
			lastUpdate: 0,
			total: 0,
			total_artificial: 0,
			week: 0,
			week_artificial: 0,
			day: 0,
			day_artificial: 0,
			hour: 0,
			hour_artificial: 0,
			userTotal: 0,
			usersAvg: 0,
		}
	}

	componentWillMount() {
		setInterval(this.performArtificialTick, 200, this);
	}

	performArtificialTick(scope){
		// Calculate how many Ticks To Go - waypoint set 0ms after theoretical next update
		var ttg = (scope.state.lastUpdate + 3000 - Date.now()) / 200;

		// Update artificial states
		let newState = {...scope.state};

		var total_artificial_average = ttg >= 1 ? (newState.total - newState.total_artificial) / ttg : newState.total - newState.total_artificial;
		var artificial_increment = Math.floor(Math.random() * 2 + total_artificial_average - 1);
		
		artificial_increment = artificial_increment > 0 ? artificial_increment : 0;

		newState.total_artificial += newState.total_artificial < newState.total ? artificial_increment : 0;
		newState.week_artificial += newState.week_artificial < newState.week ? artificial_increment : 0;
		newState.day_artificial += newState.day_artificial < newState.day ? artificial_increment : 0;
		newState.hour_artificial += newState.hour_artificial < newState.hour ? artificial_increment : 0;

		scope.setState(newState);
	}

	render() {
		return (
			<View style={styles.containerStats}>
				<Image source={require('./res/ForasVertical.png')} style={styles.statsBackground}></Image>
			    <ArrowButton dir={'down'} fallback={height} target={0} link={this.props.link} 
			    	style={styles.arrowStatsStats} onPan={ (state) => this.props.link._onPan(state, height, -1) } 
			    	onPanEnd={ (state) => this.props.link._onPanEnd(state, height, 0) } />

			    <Text style={styles.statsBigValue}>
			        { HelperFunctions.prettifyNumber(this.state.total_artificial) }
			    </Text>
			    <Text style={styles.statsBigLabel}>
			        TOTAIS
			    </Text>

			    <Text style={styles.statsValue}>
			        { HelperFunctions.prettifyNumber(this.state.week_artificial) }
			    </Text>
			    <Text style={styles.statsLabel}>
			        ESSA SEMANA
			    </Text>

			    <Text style={styles.statsValue}>
			        { HelperFunctions.prettifyNumber(this.state.day_artificial) }
			    </Text>
			    <Text style={styles.statsLabel}>
			        HOJE
			    </Text>

			    <Text style={styles.statsValue}>
			        { HelperFunctions.prettifyNumber(this.state.hour_artificial) }
			    </Text>
			    <Text style={styles.statsLabel}>
			        NA ÚLTIMA HORA
			    </Text>

			    <Text style={styles.statsValue}>
			        { HelperFunctions.prettifyNumber(this.state.userTotal) }
			    </Text>
			    <Text style={styles.statsLabel}>
			        SÓ SEUS
			    </Text>

			    <Text style={styles.statsValue}>
			        { HelperFunctions.prettifyNumber(this.state.usersAvg) }
			    </Text>
			    <Text style={styles.statsLabel}>
			        MÉDIA POR PESSOA
			    </Text>
			</View>
		);
	}
}

module.exports = Statistics;