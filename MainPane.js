'use strict';

var React = require('react-native');
var {
	Component,
	View
} = React;

import styles from './styles';
const makePannable = require('./MakePannable');

var MainButton = require('./MainButton');
var PressCounter = require('./PressCounter');
var LevelBar = require('./LevelBar');

@makePannable
class MainPane extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<View>
				<LevelBar link={this.props.link} ref={ (c) => { this.props.link.state.levelBar = c; this.props.link.setupSync(); } }/>
                <MainButton link={this.props.link}/>
                <PressCounter link={this.props.link} ref={ (c) => { this.props.link.state.pressCounter = c; this.props.link.setupSync(); } }/>
           	</View>
		);
	}
}

module.exports = MainPane;