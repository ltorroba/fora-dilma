'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    Component,
    Dimensions,
    Image,
    TouchableWithoutFeedback
} = React;

var ReactART = require('ReactNativeART');
var {
    LinearGradient,
    RadialGradient,
    Pattern,
    Transform,
    Path,
    Surface,
    Group,
    ClippingRectangle,
    Shape,
} = ReactART;

var {height, width} = Dimensions.get('window');

var styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 30,
        margin: 80
    },
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#2c3e50'
    },
    level: {
        backgroundColor: '#27ae60',
        width: width,
        height: 80,
        margin: 0,
        padding: 0
    },
    levelHighlight: {
        position: 'absolute',
        backgroundColor: '#2ecc71',
        width: 100,
        height: 80
    },
    levelText: {
        marginTop: 20,
        color: 'black',
        fontSize: 30,
        margin: 0,
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    hitsText: {
        color: 'white',
        fontSize: 60,
        margin: 0,
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    hitsContainer: {
        position: 'absolute',
        width: width,
        bottom: 80
    },
    button: {
        width: (width-40),
        height: (width-40),
        marginTop: (height - 80) / 2 - (width - 40) / 2 - 30,
        marginLeft: 40 / 2
    }
});

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

class ForaDilmaApp extends Component {
    constructor() {
        super();
        this.state = {
            presses: 200000
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.level}>
                    <View style={styles.levelHighlight}></View>
                    <Text style={styles.levelText}>PROTESTANTE MIRIM</Text>
                </View>
                <MainButton link={this}/>
                <View style={styles.hitsContainer}>
                    <Text style={styles.hitsText}>
                        {this.state.presses}
                    </Text>
                </View>
            </View>
        );
    }
}

React.AppRegistry.registerComponent('ForaDilma', function() { return ForaDilmaApp });