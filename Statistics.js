'use strict';

var React = require('react-native');
var {
	Component,
	Image,
	Text,
	Dimensions
} = React;

import styles from './styles';
var ArrowButton = require('./ArrowButton.js');

var { height, width } = Dimensions.get('window');

class Statistics extends Component {
	constructor() {
		super();

		this.state = {
			total: 0,
			week: 0,
			day: 0,
			hour: 0,
			totalUser: 0,
			personAverage: 0
		}
	}

	render() {
		return (
			<Image source={require('./res/ForasVertical.png')} style={styles.containerStats}>
			    <ArrowButton dir={'down'} fallback={height} target={0} link={this.props.link} 
			    	style={styles.arrowStatsStats} onPan={ (state) => this.props.link._onPan(state, height) } 
			    	onPanEnd={ (state) => this.props.link._onPanEnd(state, height, 0) } />

			    <Text style={styles.statsBigValue}>
			        {this.state.total}
			    </Text>
			    <Text style={styles.statsBigLabel}>
			        TOTAIS
			    </Text>

			    <Text style={styles.statsValue}>
			        {this.state.week}
			    </Text>
			    <Text style={styles.statsLabel}>
			        ESSA SEMANA
			    </Text>

			    <Text style={styles.statsValue}>
			        {this.state.day}
			    </Text>
			    <Text style={styles.statsLabel}>
			        HOJE
			    </Text>

			    <Text style={styles.statsValue}>
			        {this.state.hour}
			    </Text>
			    <Text style={styles.statsLabel}>
			        NA ÚLTIMA HORA
			    </Text>

			    <Text style={styles.statsValue}>
			        {this.state.totalUser}
			    </Text>
			    <Text style={styles.statsLabel}>
			        SÓ SEUS
			    </Text>

			    <Text style={styles.statsValue}>
			        {this.state.personAverage}
			    </Text>
			    <Text style={styles.statsLabel}>
			        MÉDIA POR PESSOA
			    </Text>
			</Image>
		);
	}
}

module.exports = Statistics;