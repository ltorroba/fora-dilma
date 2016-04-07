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
    },
    containerStats: {
        width: width,
        height: height,
        resizeMode: 'contain'
    },
    statsBigValue: {
        margin: 0,
        marginTop: 5,
        color: 'white',
        fontSize: 60,        
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    statsBigLabel: {
        color: 'white',
        fontSize: 20,
        margin: 0,
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    statsValue: {
        margin: 0,
        marginTop: 10,
        color: 'white',
        fontSize: 40,        
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    statsLabel: {
        color: 'white',
        fontSize: 15,
        margin: 0,
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    arrowStats: {
        width: 20,
        height: 20,
        marginTop: 30,
        marginLeft: (width-20)/2
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

class ArrowButton extends Component {
    constructor(props) {
        super();
        this.state = {
            direction: props.dir,
            route: props.route
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPressIn={ () => this.onPress() } >
                <Image source={ this.state.direction == 'up' ? require('./res/SmallArrow.png') : require('./res/SmallArrowDown.png') } style={styles.arrowStats} />
            </TouchableWithoutFeedback>
        );
    }

    onPress() {
        let newMainState = {...this.props.link.state};
        newMainState.route = this.state.route;
        this.props.link.setState(newMainState);
    }
}

class ForaDilmaApp extends Component {
    constructor() {
        super();
        this.state = {
            presses: 200000,
            route: 'stats'
        }
    }

    render() {
        if(this.state.route === 'main') {
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

                    <ArrowButton dir={'up'} route={'stats'} link={this}/>
                </View>
            );
        } else if (this.state.route === 'stats') {
            return (
                <View style={styles.container}>
                    <Image source={require('./res/ForasVertical.png')} style={styles.containerStats}>
                        <ArrowButton dir={'down'} route={'main'} link={this}/>

                        <Text style={styles.statsBigValue}>
                            200.000
                        </Text>
                        <Text style={styles.statsBigLabel}>
                            TOTAIS
                        </Text>

                        <Text style={styles.statsValue}>
                            +7%
                        </Text>
                        <Text style={styles.statsLabel}>
                            NA ÚLTIMA SEMANA
                        </Text>

                        <Text style={styles.statsValue}>
                            84
                        </Text>
                        <Text style={styles.statsLabel}>
                            SÓ SEUS
                        </Text>

                        <Text style={styles.statsValue}>
                            120
                        </Text>
                        <Text style={styles.statsLabel}>
                            MÉDIA POR PESSOA
                        </Text>

                        <Text style={styles.statsValue}>
                            7
                        </Text>
                        <Text style={styles.statsLabel}>
                            POR MINUTO
                        </Text>

                        <Text style={styles.statsValue}>
                            28.000
                        </Text>
                        <Text style={styles.statsLabel}>
                            NAS ÚLTIMAS 24H
                        </Text>
                    </Image>
                </View>
            );
        }
    }
}

React.AppRegistry.registerComponent('ForaDilma', function() { return ForaDilmaApp });