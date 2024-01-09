import { Dimensions, StyleSheet, View } from 'react-native'
import React, { useCallback, useImperativeHandle } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Color from '../constant/color';


const { height: SCREEN_HEIGHT } = Dimensions.get('screen');
export type BottomSheetProps = {
    children?: React.ReactNode
}
export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void;
    isActive: () => boolean;
}

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
const MAX_IMAGE_SIZE = 170; 

const BottomSheetHdh = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
    ({ children }, ref) => {
        const translateY = useSharedValue(0);
        const active = useSharedValue(false);
        const scrollTo = useCallback((destination: number) => {
            'worklet';
            active.value = destination !== 0
            translateY.value = withSpring(destination, { damping: 50 });
        }, []);

        const isActive = useCallback(() => {
            return active.value;
        }, [])

        useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive])

        const context = useSharedValue({ y: 0 });
        const gesture = Gesture.Pan()
            .onStart(() => {
                context.value = { y: translateY.value };
            })
            .onUpdate((event) => {
                translateY.value = event.translationY + context.value.y;
                translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
            })
            .onEnd(() => {
                if (translateY.value > -SCREEN_HEIGHT / 3) {
                    scrollTo(0)
                } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
                    scrollTo(MAX_TRANSLATE_Y)
                }
            });

        const RBottomSheetStyle = useAnimatedStyle(() => {
            const borderRadius = interpolate(
                translateY.value,
                [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
                [25, 5],
                Extrapolate.CLAMP,
            )
            return {
                borderRadius,
                transform: [{ translateY: translateY.value }]
            };
        });

        const RbackDropStyle = useAnimatedStyle(() => {
            return {
                opacity: withTiming(active.value ? 1 : 0),
            }
        }, []);
        const rBackdropProps = useAnimatedProps(() => {
            return {
                pointerEvents: active.value ? 'auto' : 'none',
            } as any
        }, []);
        const viewImageStyle = useAnimatedStyle(() => {
            const paddingTop = interpolate(
                translateY.value,
                [MAX_TRANSLATE_Y, 0],
                [20, -20], // UKURAN PADDING SAAT PENUH DAN HILANG
                Extrapolate.CLAMP
            );
            return {
                paddingTop:paddingTop
            }
        })

        const imageStyle = useAnimatedStyle(() => {
            const imageSize = interpolate(
                translateY.value,
                [MAX_TRANSLATE_Y, 0],
                [MAX_IMAGE_SIZE, -170], // Ukuran gambar saat penuh hingga hilang
                Extrapolate.CLAMP,
            );
            

            return {
                width: imageSize,
                height: imageSize,
            };
        });


        return (
            <>
                <Animated.View
                    animatedProps={rBackdropProps}
                    onTouchStart={() => {
                        scrollTo(0);
                    }}
                    style={[{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: 'rgba(0,0,0,0.4)'
                    }, RbackDropStyle]}
                />
                <GestureDetector gesture={gesture}>
                    <Animated.View style={[styles.bottomsheetcontainer, RBottomSheetStyle]}>
                        <View style={styles.line} />
                        <Animated.View style={[{backgroundColor:Color.icon}, viewImageStyle]}>
                            <Animated.Image
                                source={require('../../assets/images/add-customer.png')}
                                resizeMode='contain'
                                style={[imageStyle, {
                                    alignSelf: 'center'
                                }]}
                            />
                        </Animated.View>
                        {children}
                    </Animated.View>
                </GestureDetector>
            </>
        )
    })

export default BottomSheetHdh

const styles = StyleSheet.create({
    bottomsheetcontainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15
    }
})