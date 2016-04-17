'use strict';

var React = require('react-native');
var { 
    Component,
    TouchableWithoutFeedback,
    Image
} = React;

var Sound = require('react-native-sound');
var soundActive = false;

var ForaShout = new Sound('fora.mp3', Sound.MAIN_BUNDLE, (error) => {
    if(error) {
        console.log('Failed to load sound', error);
    } else {
        console.log('Successfully loaded sound');
    }  
});

import styles from './styles';

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
            <TouchableWithoutFeedback onPressIn={ () => this.toggleButton(true) } onPressOut={ () => this.toggleButton(false) }>
                <Image source={ this.state.pressed ? buttonPressed : buttonNormal } style={styles.button}/>
            </TouchableWithoutFeedback>
        );
    }

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