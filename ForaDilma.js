'use strict';

var React = require('react-native');
var {
    Component,
    Animated,
    View,
    Dimensions,
    Text,
    Image,
    Easing
} = React;

import styles from './styles';
var MainButton = require('./MainButton.js');
var ArrowButton = require('./ArrowButton.js');
var PressCounter = require('./PressCounter.js');

var { height, width } = Dimensions.get('window');

class ForaDilma extends Component {
    constructor() {
        super();

        this.panStart = -1;
        this.state = {
            pressCounter: null,
            verticalOffset: new Animated.Value(0)
        }

    }

    componentWillMount() {
        this.state.verticalOffset.setValue(0);
    }

    setupSync(scope) {
        // Initial sync
        this.sync(scope);

        setInterval(this.sync, 3000, scope);
    }

    async sync(scope) {
        // Transfer current presses to temporary store
        var temp = scope.state.queuedPresses;

        // Reset queue
        let newState = {...scope.state};
        newState.queuedPresses = 0;
        scope.setState(newState);

        fetch('http://console.zes.me/fora-dilma-server/sync.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                queuedPresses: temp
            })
        })
        .then((response) => response.text())
        .then((responseText) => {
            // Update counter, taking into consideration any queued presses
            let newState = {...scope.state};
            newState.presses = parseInt(JSON.parse(responseText).presses) + newState.queuedPresses;
            scope.setState(newState);
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    _onPan (state, pivot) {
        if(this.panStart <= -1)
            this.panStart = Date.now();

        this.state.verticalOffset.setValue(pivot - state.changeY);

    }

    _onPanEnd (state, fallback, target) {
        // Simulate button press if small tap is intentionally made instead of a button press
        if(Date.now() - this.panStart <= 1000) {
            Animated.spring(this.state.verticalOffset, {
                toValue: target,
                easing: Easing.linear
            }).start();
        }

        // Trigger transition if pan is strong enough
        if(Math.abs(state.velocityY) >= 3) {
            Animated.spring(this.state.verticalOffset, {
                toValue: target,
                easing: Easing.linear
            }).start();
        } else { // Fallback if transition is weak
            Animated.spring(this.state.verticalOffset, {
                toValue: fallback,
                easing: Easing.linear
            }).start();
        }

        this.panStart = -1;
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
                        <PressCounter link={this} ref={ c => this.state.pressCounter = c }/>
                    </View>

                    <ArrowButton dir={'up'} fallback={0} target={height} link={this} style={styles.arrowStatsMain} onPan={ (state) => this._onPan(state, 0) } onPanEnd={ (state) => this._onPanEnd(state, 0, height) } />
                </Animated.View>
                <Animated.View style={{ position: 'absolute', top: this.state.verticalOffset.interpolate({ inputRange: [0, height], outputRange: [height, 0] })}}>
                    <Image source={require('./res/ForasVertical.png')} style={styles.containerStats}>
                        <ArrowButton dir={'down'} fallback={height} target={0} link={this} style={styles.arrowStatsStats} onPan={ (state) => this._onPan(state, height) } onPanEnd={ (state) => this._onPanEnd(state, height, 0) } />

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

module.exports = ForaDilma;