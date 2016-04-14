'use strict';

var React = require('react-native');
var { 
    Component,
    TouchableWithoutFeedback,
    Image
} = React;

var styles = require('./styles.js');

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
        }

        this.forceUpdate();

        this.setState(newState);
        this.props.link.setState(newMainState);
    }
}

module.exports = MainButton;