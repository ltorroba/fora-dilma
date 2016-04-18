'use strict';

var React = require('react-native');
var {
	Component,
	TouchableWithoutFeedback,
	Image,
	Animated,
	Easing
} = React;

const makePannable = require('./MakePannable.js');

@makePannable
class ArrowButton extends Component {
    constructor(props) {
        super();

        this.state = {
            direction: props.dir,
            fallback: props.fallback,
            target: props.target
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={ () => this.onPress() }>
                <Image source={ require('./res/SmallArrow.png') }  style={{ width: this.state.direction == 'up' ? 60 : 40, height: this.state.direction == 'up' ? 60 : 40, transform: [ { scaleY: this.state.direction == 'up' ? 1 : -1 } ] }}/>
            </TouchableWithoutFeedback>
        );
    }

    onPress() {
        Animated.spring(this.props.link.state.verticalOffset, {
            toValue: this.props.target,
            easing: Easing.linear
        }).start();
    }
}

module.exports = ArrowButton;