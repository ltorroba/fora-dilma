'use strict';

// Core modules
import React, {
    Component,
    Image,
    Text,
    Dimensions,
    View
} from 'react-native';

// Local modules
import styles from './styles';
import HelperFunctions from './HelperFunctions';
import makePannable from './MakePannable';

var { height, width } = Dimensions.get('window');

@makePannable
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
			usersAvg: 0
		}
	}

	componentWillMount() {
		this.props.link.state.statsPane = this;
		this.props.link.setupSync();

		setInterval(this.performArtificialTick, 200, this);
	}

        // The way artificial ticks work is that the function will use the variables 'total', 'week', etc.
        // as waypoints, and increment gradually their artificial counterparts ('total_artificial', 
        // 'week_artificial', etc. respectively).
	performArtificialTick(scope){
		// Calculate how many Ticks To Go - waypoint set 0ms after theoretical next update
		var ttg = (scope.state.lastUpdate + 3000 - Date.now()) / 200;

		// Update artificial states
		let newState = {...scope.state};

		// Increment artificial total
		var artificial_increment_total = ttg >= 1 ? (newState.total - newState.total_artificial) / 
                    ttg : newState.total - newState.total_artificial;
		artificial_increment_total = Math.abs(Math.floor(Math.random() * 2 + 
                    artificial_increment_total - 1));
		artificial_increment_total = Math.abs(newState.total_artificial - newState.total) >= 
                    artificial_increment_total ? artificial_increment_total : Math.abs(newState.total_artificial - newState.total);
		newState.total_artificial += newState.total_artificial <= newState.total ? 
                    artificial_increment_total : artificial_increment_total * -1;

		// Increment week artificial
		var artificial_increment_week = ttg >= 1 ? (newState.week - newState.week_artificial) / 
                    ttg : newState.week - newState.week_artificial;
		artificial_increment_week = Math.abs(Math.floor(Math.random() * 2 + 
                    artificial_increment_week - 1));
		artificial_increment_week = Math.abs(newState.week_artificial - newState.week) >= 
                    artificial_increment_week ? artificial_increment_week : 
                    Math.abs(newState.week_artificial - newState.week);
		newState.week_artificial += newState.week_artificial <= newState.week ? 
                    artificial_increment_week : artificial_increment_week * -1;

		// Increment day artificial
		var artificial_increment_day = ttg >= 1 ? (newState.day - newState.day_artificial) / 
                    ttg : newState.day - newState.day_artificial;
		artificial_increment_day = Math.abs(Math.floor(Math.random () * 2 + 
                    artificial_increment_day - 1));
		artificial_increment_day = Math.abs(newState.day_artificial - newState.day) >= 
                    artificial_increment_day ? artificial_increment_day : 
                    Math.abs(newState.day_artificial - newState.day);
		newState.day_artificial += newState.day_artificial <= newState.day ? 
                    artificial_increment_day : artificial_increment_day * -1;

		// Increment hour artificial
		var artificial_increment_hour = ttg >= 1 ? (newState.hour - newState.hour_artificial) / 
                    ttg : newState.hour - newState.hour_artificial;
		artificial_increment_hour = Math.abs(Math.floor(Math.random () * 2 + 
                    artificial_increment_hour - 1));
		artificial_increment_hour = Math.abs(newState.hour_artificial - newState.hour) >= 
                    artificial_increment_hour ? artificial_increment_hour : 
                    Math.abs(newState.hour_artificial - newState.hour);
		newState.hour_artificial += newState.hour_artificial <= newState.hour ? 
                    artificial_increment_hour : artificial_increment_hour * -1;

		scope.setState(newState);
	}

	render() {
		return (
			<View style={styles.containerStats}>
				<Image source={require('./res/ForasVertical.png')} 
                                    style={styles.statsBackground}></Image>

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
