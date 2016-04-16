'use strict';

var React = require('react-native');
var {
	Text,
	View,
	Component
} = React;

import styles from './styles';

class PressCounter extends Component {
	constructor() {
		super();
		this.state = {
			queuedPresses: 0,
			presses: 0
		}
	}

	render() {
		return (
			<Text style={styles.hitsText}>
                {this.state.presses}
            </Text>
		);
	}

	componentWillMount() {
		this.props.link.setupSync(this);
	}
}

module.exports = PressCounter;