'use strict';

var React = require('react-native');
var {
    Component,
    Animated,
    View,
    Dimensions,
    Text,
    Image
} = React;

var styles = require('./styles.js');
var MainButton = require('./MainButton.js');
var ArrowButton = require('./ArrowButton.js');

var { height, width } = Dimensions.get('window');

class ForaDilma extends Component {
    constructor() {
        super();

        this.panStart = -1;
        this.state = {
            presses: 200000,
            verticalOffset: new Animated.Value(0)
        }
    }

    componentWillMount() {
        this.state.verticalOffset.setValue(0);
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
                        <Text style={styles.hitsText}>
                            {this.state.presses}
                        </Text>
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