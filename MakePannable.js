'use strict';

// Core modules
import React, {
    Component,
    PanResponder,
    View
} from 'react-native';

// ES6-style decorator to make an object pannable
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
                changeY: 0,
                velocityX: 0,
                velocityY: 0,
                absoluteX: 0,
                absoluteY: 0
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

                onMoveShouldSetPanResponder: (evt, gestureState ) => {
                    return gestureState.dx != 0 && gestureState.dy != 0 && evt.touches.length === 1;
                },

                onMoveShouldSetPanResponderCapture: (evt, gestureState ) => {
                    return gestureState.dx != 0 && gestureState.dy != 0;
                },

                onPanResponderMove: (evt, {dx, dy, vx, vy, moveX, moveY}) => {
                    const { onPan } = this.props;

                    const newState = {
                        absoluteChangeX: this.lastX + dx,
                        absoluteChangeY: this.lastY + dy,
                        changeX: dx,
                        changeY: dy,
                        velocityX: vx,
                        velocityY: vy,
                        absoluteX: moveX,
                        absoluteY: moveY
                    }

                    this.setState(newState);

                    onPan && onPan(newState);
                },

                onPanResponderTerminationRequest: () => true,
                onPanResponderTerminate: this.handlePanResponderRelease,
                onPanResponderRelease: this.handlePanResponderRelease

            });
        }

        handlePanResponderRelease = (evt, {dx, dy, vx, vy, moveX, moveY}) => {
            const { onPanEnd } = this.props;

            this.lastX = this.state.absoluteChangeX;
            this.lastY = this.state.absoluteChangeY;

            const newState = {
                absoluteChangeX: this.lastX + dx,
                absoluteChangeY: this.lastY + dy,
                changeX: dx,
                changeY: dy,
                velocityX: vx,
                velocityY: vy,
                absoluteX: moveX,
                absoluteY: moveY
            }

            this.setState(newState);

            onPanEnd && onPanEnd(newState);
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

module.exports = makePannable;
