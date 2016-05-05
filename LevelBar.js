'use strict';

// Core modules
import React, {
    Component,
    View,
    Text,
    Dimensions,
    Animated,
    Easing
} from 'react-native';

// Additional modules
import Emoji from 'react-native-emoji';

// Local modules
import styles from './styles';

var { height, width } = Dimensions.get('window');

class LevelBar extends Component {
	constructor() {
		super();

		this.state = {
			level: 0,
			experience: 0,
			progress: new Animated.Value(0)
		}
	}

	render() {
		return (
			<View style={ this.getLevelBaseStyle() }> 
	            <Animated.View style={ this.getLevelHighlightStyle(this.state.progress.interpolate({ 
                        inputRange: [0, this.getLevelProgress(this.state.level + 1)], 
                        outputRange: [0, width] })) }></Animated.View>
	            { this.getLevelText() }
	        </View> 
		);
	}

	setProgress(p) {
		Animated.timing(this.state.progress, {
			duration: 100,
			toValue: p,
			easing: Easing.linear
		}).start( ( { finished } ) => {
			if(p >= this.getLevelProgress(this.state.level + 1)) {
				// Levelled up
				let newState = {...this.state};

				newState.experience -= this.getLevelProgress(this.state.level + 1);				
				newState.level++;

				this.setState(newState);				
				this.setProgress(newState.experience);
			}
		});
	}

	incrementProgress(i) {
		let newState = {...this.state};
		newState.experience += i;
		this.setState(newState);
		this.setProgress(newState.experience);
	}

	getLevelProgress(level) {
                // Number of clicks to level up, per level
		var progress = [0, 1, 10, 25, 50, 100, 250, 500, 1000]; 
		if(level < 9 && level >= 0)
			return progress[level];

		return Number.MAX_SAFE_INTEGER;
	}

	setupProgress(p) {
		let newState = {...this.state};
		newState.level = 0;
		newState.experience = p;

		while(newState.experience >= this.getLevelProgress(newState.level + 1)) {
			newState.experience -= this.getLevelProgress(newState.level + 1);
			newState.level++;
		}

		this.setState(newState);
		this.setProgress(newState.experience);
	}

	getLevelBaseStyle() {
                var base = {
                        width: width,
                        height: 80,
                        margin: 0,
                        padding: 0
                }

                switch(this.state.level) {
			default:
			case 0: // Alienado político
				base.backgroundColor = '#7f8c8d'
				break;
			case 1: // Protestante de sofá
				base.backgroundColor = '#16a085'
				break;
			case 2: // Ativista social
				base.backgroundColor = '#2980b9'
				break;
			case 3: // Coxinha
				base.backgroundColor = '#d35400'
				break;
			case 4: // Panelista master
				base.backgroundColor = '#bdc3c7'
				break;
			case 5: // Carapintada
				base.backgroundColor = '#27ae60'
				break;
			case 6: // Caça-petralhas
				base.backgroundColor = '#c0392b'
				break;
			case 7: // Japonês da federal
				base.backgroundColor = '#8e44ad'
				break;
			case 8: // Sérgio Moro Jr.
				base.backgroundColor = '#f39c12'
				break;
		}

		return base;
	}

	getLevelHighlightStyle(w) {
                var base = {
                        position: 'absolute',
                        width: w,
                        height: 80
                }

                switch(this.state.level) {
			default:
			case 0: // Alienado político
				base.backgroundColor = '#95a5a6'
				break;
			case 1: // Protestante de sofá
				base.backgroundColor = '#1abc9c'
				break;
			case 2: // Ativista social
				base.backgroundColor = '#3498db'
				break;
			case 3: // Coxinha
				base.backgroundColor = '#e67e22'
				break;
			case 4: // Panelista master
				base.backgroundColor = '#ecf0f1'
				break;
			case 5: // Carapintada
				base.backgroundColor = '#2ecc71'
				break;
			case 6: // Caça-petralhas
				base.backgroundColor = '#e74c3c'
				break;
			case 7: // Japonês da federal
				base.backgroundColor = '#9b59b6'
				break;
			case 8: // Sérgio Moro Jr.
				base.backgroundColor = '#f1c40f'
				break;
		}

		return base;
	}

	getLevelTextStyle() {
		var base = {
			marginTop: 25,
	        color: 'black',
	        fontSize: 25,
	        margin: 0,
	        backgroundColor: 'transparent',
	        textAlign: 'center'
	    }

		return base;
	}

        // Generates JSX element that goes in the level bar
	getLevelText() {
		switch(this.state.level) {
			default:
			case 0:
				return (<Text style={ this.getLevelTextStyle() }>ALIENADO POLÍTICO <Emoji name='alien' /></Text>);
			case 1:
				return (<Text style={ this.getLevelTextStyle() }>PROTESTANTE DE SOFA <Emoji name='sleeping' /></Text>);
			case 2:
				return (<Text style={ this.getLevelTextStyle() }>ATIVISTA DE FACEBOOK <Emoji name='+1' /></Text>);
			case 3:
				return (<Text style={ this.getLevelTextStyle() }>COXINHA <Emoji name='poultry_leg' /></Text>);
			case 4:
				return (<Text style={ this.getLevelTextStyle() }>PANELISTA MASTER <Emoji name='egg' /></Text>);
			case 5:
				return (<Text style={ this.getLevelTextStyle() }>SAUDADOR DA MANDIOCA <Emoji name='raised_hands' /></Text>);
			case 6:
				return (<Text style={ this.getLevelTextStyle() }>CAÇA-PETRALHAS <Emoji name='smiling_imp' /></Text>);
			case 7:
				return (<Text style={ this.getLevelTextStyle() }>JAPONÊS DA FEDERAL <Emoji name='cop' /></Text>);
			case 8:
				return (<Text style={ this.getLevelTextStyle() }>SÉRGIO MORO JR. <Emoji name='star2' /></Text>);
		}
	}
}

module.exports = LevelBar;
