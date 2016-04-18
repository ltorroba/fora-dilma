'use strict';

var React = require('react-native');
var {
    Component,
    Animated,
    View,
    Dimensions,
    Text,
    Image,
    Easing,
    Alert
} = React;

import styles from './styles';
import Storage from 'react-native-storage';
var MainButton = require('./MainButton');
var ArrowButton = require('./ArrowButton');
var PressCounter = require('./PressCounter');
var Statistics = require('./Statistics');
var LevelBar = require('./LevelBar');
var HelperFunctions = require('./HelperFunctions');

var { height, width } = Dimensions.get('window');

var storage = new Storage({ 
    size: 1000,    
    defaultExpires: null,
    enableCache: true,
    sync : {
        permanent(params) {
            storage.save({
                key: 'permanent',
                rawData: {
                    id: HelperFunctions.generateId()
                },
                expires: null
            });
        }
    }
});

class ForaDilma extends Component {
    constructor() {
        super();

        this.panStart = -1;
        this.state = {
            pressCounter: null,
            statsPane: null,
            levelBar: null,
            verticalOffset: new Animated.Value(0),
            userId: '',
            syncSetup: false,
            dataSetup: false,
            error: false
        }

        storage.load({
            key: 'permanent',
            autoSync: true,
            syncInBackground: true
        }).then((data) => {
            let newState = {...this.state}
            newState.id = data.id;
            this.setState(newState);
            this.setupSync();
        });
    }

    componentWillMount() {
        this.state.verticalOffset.setValue(0);
    }

    setupSync() {
        if(this.state.statsPane && this.state.pressCounter && this.state.levelBar && this.state.id && !this.state.syncSetup) {
            // Initial sync
            this.sync(this.state.pressCounter, this.state.statsPane, this);

            setInterval(this.sync, 3000, this.state.pressCounter, this.state.statsPane, this);

            let newState = {...this.state};
            newState.syncSetup = true;
            this.setState(newState);
        }
    }

    async sync(pc, sp, r) {
        if(!r.state.error) {
            // Transfer current presses to temporary store
            var temp = pc.state.queuedPresses;

            // Reset queue
            let newState = {...pc.state};
            newState.lastPressBatch = newState.localPresses;
            newState.queuedPresses = 0;
            pc.setState(newState);

            fetch('http://console.zes.me/fora-dilma-server/sync.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    queuedPresses: temp,
                    userId: r.state.userId
                })
            })
            .then((response) => response.text())
            .then((responseText) => {
                if(JSON.parse(responseText).error) {
                    r.die(JSON.parse(responseText).error, r);                    
                } else {
                    // Update counter, taking into consideration any queued presses
                    let newPcState = {...pc.state};
                    newPcState.presses = parseInt(JSON.parse(responseText).presses) - newPcState.lastPressBatch;
                    newPcState.pressesSinceLastSync = newPcState.queuedPresses;
                    newPcState.lastUpdate = Date.now();

                    // Update stats pane
                    let newSpState = {...sp.state};
                    newSpState.total = parseInt(JSON.parse(responseText).presses);
                    newSpState.week = parseInt(JSON.parse(responseText).week);
                    newSpState.day = parseInt(JSON.parse(responseText).day);
                    newSpState.hour = parseInt(JSON.parse(responseText).hour);
                    newSpState.usersAvg = parseInt(JSON.parse(responseText).usersAvg);
                    newSpState.lastUpdate = Date.now();

                    // Setup level bar, if not done already, alongside initial artificial values
                    if(!r.state.dataSetup) {
                        newSpState.total_artificial = parseInt(JSON.parse(responseText).presses);
                        newSpState.week_artificial = parseInt(JSON.parse(responseText).week);
                        newSpState.day_artificial = parseInt(JSON.parse(responseText).day);
                        newSpState.hour_artificial = parseInt(JSON.parse(responseText).hour);
                        newSpState.userTotal = parseInt(JSON.parse(responseText).userTotal);

                        newPcState.presses_artificial = parseInt(JSON.parse(responseText).presses);

                        r.state.levelBar.setupProgress(newSpState.userTotal);
                        r.state.dataSetup = true;
                    }

                    // Trigger updates
                    pc.setState(newPcState);
                    sp.setState(newSpState);
                }
            })
            .catch((error) => {
                r.die('Erro ao tentar estabelecer conexão', r);
            });
        }
    }

    _onPan (state, pivot, orientation) {
        if(this.panStart <= -1)
            this.panStart = Date.now();

        var delta = pivot - state.changeY;
        delta = delta > 0 ? delta : 0;

        this.state.verticalOffset.setValue(delta);
    }

    _onPanEnd (state, fallback, target) {
        // Simulate button press if small tap is intentionally made instead of a button press
        if(Date.now() - this.panStart <= 1000) {
            Animated.spring(this.state.verticalOffset, {
                toValue: target,
                easing: Easing.linear
            }).start();
        }

        var threshold = (Math.abs(state.absoluteY - fallback) - (height / 2)) / (height / 2) * 2;

        // Trigger transition if pan is strong enough
        if(Math.abs(state.velocityY) >= threshold) {
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
                <Animated.View style={{ position: 'absolute', 
                                        top: this.state.verticalOffset.interpolate({ inputRange: [0, height], outputRange: [0, -height] })}}>
                    <LevelBar link={this} ref={ (c) => { this.state.levelBar = c; this.setupSync(); } }/>

                    <MainButton link={this}/>

                    <PressCounter link={this} ref={ (c) => { this.state.pressCounter = c; this.setupSync(); } }/>

                    <ArrowButton dir={'up'} fallback={0} target={height} link={this} style={styles.arrowStatsMain} onPan={ (state) => this._onPan(state, 0, 1) } onPanEnd={ (state) => this._onPanEnd(state, 0, height) } />
                </Animated.View>
                <Animated.View style={{ position: 'absolute', 
                                        top: this.state.verticalOffset.interpolate({ inputRange: [0, height], outputRange: [height, 0] }), 
                                        opacity: this.state.verticalOffset.interpolate({ inputRange: [0, height], outputRange: [0, 1] })}}>
                    <Statistics link={this} ref={ (c) => { this.state.statsPane = c; this.setupSync(); } }/>
                </Animated.View>
            </View>
        );
    }

    die(message, rootScope) {
        rootScope.state.error = true;

        Alert.alert('Erro!', message, [
            { text: 'Culpa da Dilma!', onPress: () => { 
                console.log("OK pressed");
            } }
        ]);
    }
}

module.exports = ForaDilma;