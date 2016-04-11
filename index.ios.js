'use strict';
import rebound from 'rebound';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    Component,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    PanResponder
} = React;

var {height, width} = Dimensions.get('window');

var styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#2c3e50'
    },
    text: {
        color: 'black',
        fontSize: 30,
        margin: 80
    },
    pages: {
        position: 'absolute',
        flex: 1
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
        top: height-140
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
    arrowStatsMain: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: height - 50,
        marginLeft: (width-20)/2
    },
    arrowStatsStats: {
        position: 'relative',
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

const makePannable = BaseComponent => {
    return class extends Component {
        constructor(props, context) {
            super(props, context);

            this.lastX = 0;
            this.lastY = 0;

            this.state = {
                absoluteChangeX: 0,
                absoluteChangeY: 0,
                changeX: 0,
                changeY: 0
            };
        }

        componentWillMount() {
            this._panResponder = PanResponder.create({
                onStartShouldSetPanResponder: ({ nativeEvent: { touches } }, { x0, y0 }) => {
                    const shouldSet = touches.length === 1;

                    if (shouldSet) {
                        const { onPanBegin } = this.props;

                        onPanBegin && onPanBegin({
                            originX: x0,
                            originY: y0
                        });
                    }

                    return shouldSet;
                },

                onMoveShouldSetPanResponder: ({ nativeEvent: { touches } }) => {
                    return touches.length === 1;
                },

                onPanResponderMove: (evt, {dx, dy}) => {
                    const { onPan } = this.props;

                    const newState = {
                        absoluteChangeX: this.lastX + dx,
                        absoluteChangeY: this.lastY + dy,
                        changeX: dx,
                        changeY: dy
                    }

                    this.setState(newState);

                    onPan && onPan(newState);
                },

                onPanResponderTerminationRequest: () => true,
                onPanResponderTerminate: this.handlePanResponderRelease,
                onPanResponderRelease: this.handlePanResponderRelease

            });
        }

        handlePanResponderRelease = () => {
            const { onPanEnd } = this.props;

            this.lastX = this.state.absoluteChangeX;
            this.lastY = this.state.absoluteChangeY;

            onPanEnd && onPanEnd();
        }

        render() {
            const {
                onPanBegin,
                onPan,
                onPanEnd,
                style,
                ...props
            } = this.props;


            var res = (
                <View style={style} {...this._panResponder.panHandlers} >
                    <BaseComponent {...props} {...this.state} />
                </View>
            );

            return res;
        }
    }
}

@makePannable
class ArrowButton extends Component {
    constructor(props) {
        super();

        this.state = {
            direction: props.dir,
            offset: props.offset
        }
    }

    render() {
        //const { absoluteChangeX, absoluteChangeY, link } = this.props;   

        return (
            <TouchableWithoutFeedback>
                <Image source={ this.state.direction == 'up' ? require('./res/SmallArrow.png') : require('./res/SmallArrowDown.png') } style={{ width: 20, height: 20 }}/>
            </TouchableWithoutFeedback>
        );
    }
}

class ForaDilmaApp extends Component {
    constructor() {
        super();
        this.state = {
            presses: 200000,
            verticalOffset: new Animated.Value(0)
        }
    }

    componentWillMount() {
        this.state.verticalOffset.setValue(0);
    }

    _onPan (state) {
        console.log(state);
        this.state.verticalOffset.setValue(-state.absoluteChangeY);

        
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{ position: 'absolute', top: this.state.verticalOffset.interpolate({ inputRange: [0, height], outputRange: [0, -height] })}}>
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

                    <ArrowButton dir={'up'} offset={1} link={this} style={styles.arrowStatsMain} onPan={ (state) => this._onPan(state) } />
                </Animated.View>
                <Animated.View style={{ position: 'absolute', top: this.state.verticalOffset.interpolate({ inputRange: [0, height], outputRange: [height, 0] })}}>
                    <Image source={require('./res/ForasVertical.png')} style={styles.containerStats}>
                        <ArrowButton dir={'down'} offset={0} link={this} style={styles.arrowStatsStats} />

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
                </Animated.View>
            </View>
        );
        
    }
}

React.AppRegistry.registerComponent('ForaDilma', function() { return ForaDilmaApp });