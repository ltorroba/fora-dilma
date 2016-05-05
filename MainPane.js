'use strict';

import React, {
    Component,
    View,
    Image
} from 'react-native';

// Local modules
import styles from './styles';
import makePannable from './MakePannable';
import MainButton from './MainButton';
import PressCounter from './PressCounter';
import LevelBar from './LevelBar';

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
                <Image source={ require('./res/SmallArrow.png') } style={ styles.panArrow }/>
           	</View>
		);
	}
}

module.exports = MainPane;
