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
var MainButton = require('./MainButton');
var ArrowButton = require('./ArrowButton');
var PressCounter = require('./PressCounter');
var Statistics = require('./Statistics');

var { height, width } = Dimensions.get('window');

class ForaDilma extends Component {
    constructor() {
        super();

        this.panStart = -1;
        this.state = {
            pressCounter: null,
            statsPane: null,
            verticalOffset: new Animated.Value(0)
        }

    }

    componentWillMount() {
        this.state.verticalOffset.setValue(0);
    }

    setupSync() {
        if(this.state.statsPane && this.state.pressCounter) {
            // Initial sync
            this.sync(this.state.pressCounter, this.state.statsPane);

            setInterval(this.sync, 3000, this.state.pressCounter, this.state.statsPane);
        }
    }

    async sync(pc, sp) {
        // Transfer current presses to temporary store
        var temp = pc.state.queuedPresses;

        // Reset queue
        let newState = {...pc.state};
        newState.queuedPresses = 0;
        pc.setState(newState);
        
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
            let newPcState = {...pc.state};
            newPcState.presses = parseInt(JSON.parse(responseText).presses) + newPcState.queuedPresses;
            pc.setState(newPcState);

            // Update stats pane
            let newSpState = {...sp.state};
            newSpState.total = parseInt(JSON.parse(responseText).presses);
            newSpState.week = parseInt(JSON.parse(responseText).week);
            newSpState.day = parseInt(JSON.parse(responseText).day);
            newSpState.hour = parseInt(JSON.parse(responseText).hour);

            sp.setState(newSpState);
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
                        <PressCounter link={this} ref={ (c) => { this.state.pressCounter = c; this.setupSync(); } }/>
                    </View>

                    <ArrowButton dir={'up'} fallback={0} target={height} link={this} style={styles.arrowStatsMain} onPan={ (state) => this._onPan(state, 0) } onPanEnd={ (state) => this._onPanEnd(state, 0, height) } />
                </Animated.View>
                <Animated.View style={{ position: 'absolute', top: this.state.verticalOffset.interpolate({ inputRange: [0, height], outputRange: [height, 0] })}}>
                    <Statistics link={this} ref={ (c) => { this.state.statsPane = c; this.setupSync(); } }/>
                </Animated.View>
            </View>
        );
        
    }
}

module.exports = ForaDilma;