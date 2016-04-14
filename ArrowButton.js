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
            <TouchableWithoutFeedback onPress={ () => this.onPress() } hitSlop={{top: 50, bottom: 50, right: 50, left: 50}}>
                <Image source={ this.state.direction == 'up' ? require('./res/SmallArrow.png') : require('./res/SmallArrowDown.png') } style={{ width: 20, height: 20 }}/>
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