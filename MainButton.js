'use strict';

// Core modules
import React, { 
    Component,
    TouchableWithoutFeedback,
    Image,
    View
} from 'react-native';

// Additional modules
var Sound = require('react-native-sound');

// Local modules
import styles from './styles';

var soundActive = false;
var ForaShout = new Sound('fora.mp3', Sound.MAIN_BUNDLE, (error) => {
    if(error) {
        console.log('Failed to load sound', error);
    } else {
        console.log('Successfully loaded sound');
    }  
});

var buttonNormal = require('./res/Button.png');
var buttonPressed = require('./res/ButtonPressed.png');

class MainButton extends Component {
    constructor() {
        super();
        this.state = {
            pressed: false
        }
    }

    render() {
        return (
            <View>
                <Image source={ buttonPressed } style={{ width: 0, height: 0, opacity: 1 }} />
                <TouchableWithoutFeedback onPressIn={ () => this.toggleButton(true) } onPressOut={ () => 
                    this.toggleButton(false) }>
                    <Image source={ this.state.pressed ? buttonPressed : buttonNormal } 
                        style={styles.button}/>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    // Toggles the state of the 'Fora' button. Takes in one parameter, the state: true when pressed, 
    // false when released.
    toggleButton(s:Boolean) {
        let newState = {...this.state};
        newState.pressed = s;

        let newPressCounterState = {...this.props.link.state.pressCounter.state};
        let newStatsPaneState = {...this.props.link.state.statsPane.state};

        if(s && !this.state.pressed) {
            newPressCounterState.queuedPresses++;
            newPressCounterState.localPresses++;
            newStatsPaneState.userTotal++;

            if(soundActive)
                ForaShout.stop();

            soundActive = true;

            ForaShout.play((success) => {
                soundActive = false;
            });

            this.props.link.state.levelBar.incrementProgress(1);
            this.props.link.state.statsPane.setState(newStatsPaneState);
        }

        this.setState(newState);
        this.props.link.state.pressCounter.setState(newPressCounterState);
    }
}

module.exports = MainButton;
