'use strict';

var React = require('react-native');
var { 
    Component,
    TouchableWithoutFeedback,
    Image
} = React;

var Sound = require('react-native-sound');

var ForaShout = new Sound('Fora.mp3', Sound.MAIN_BUNDLE, (error) => {
    if(error) {
        console.log('Failed to load sound', error);
    } else {
        console.log('Successfully loaded sound');
    }  
});

import styles from './styles';

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
                <Image source={this.state.pressed ? require('./res/ButtonPressed.png') : require('./res/Button.png') } style={styles.button}/>
            </TouchableWithoutFeedback>
        );
    }

    toggleButton(s:Boolean) {
        let newState = {...this.state};
        newState.pressed = s;

        let newMainState = {...this.props.link.state};

        if(s && !this.state.pressed) {
            newMainState.presses++;
            newMainState.queuedPresses++;

            ForaShout.play((success) => {
                if(success)
                    console.log('Successfully played sound.');
                else
                    console.log('Could not play sound.');
            });            
        }

        this.forceUpdate();

        this.setState(newState);
        this.props.link.setState(newMainState);
    }
}

module.exports = MainButton;