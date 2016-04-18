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
        backgroundColor: 'transparent',
        width: 60,
        height: 60,
        top: height - 70,
        paddingLeft: (width-60)/2,
        paddingRight: width-(width-60)/2
    },
    arrowStatsStats: {
        position: 'relative',
        backgroundColor: 'transparent',
        width: 40,
        height: 50,
        paddingTop: 10,
        paddingLeft: (width-40)/2,
        paddingRight: width-(width-40)/2
    }
});

module.exports = styles;