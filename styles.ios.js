'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Dimensions
} = React;

var { height, width } = Dimensions.get('window');

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

module.exports = styles;