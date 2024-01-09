import { StyleSheet, TouchableOpacity, GestureResponderEvent, AccessibilityState, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useRef } from 'react';
import Color from '../components/constant/color';
import * as Animatable from 'react-native-animatable';

interface tabbuttonProps {
    name: string;
    route: string
    onPress: (e: GestureResponderEvent) => void;
    accessibilityState: AccessibilityState;
}

const TabButton = ({ name, onPress, accessibilityState,route }: tabbuttonProps) => {
    const focused = accessibilityState.selected;
    const viewRef = useRef<any>(null);
    const textViewRef = useRef<any>(null);

    useEffect(() => {
        if (focused) {
            viewRef.current?.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
            textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
        } else {
            viewRef.current?.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
            textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
        }
    },[focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container, {flex: focused ? 1:0.65}]}>
            <View>
                <Animatable.View
                    ref={viewRef}
                    style={[StyleSheet.absoluteFillObject,
                    { backgroundColor: Color.border, borderRadius: 16 }]}/>
                    <View style={[styles.btn,
                    { backgroundColor: focused ? 'transparent' : Color.icon }]}>
                        <MaterialIcons
                            name={name}
                            size={24}
                            color={focused ? Color.icon : Color.primary} />
                        <Animatable.View ref={textViewRef}>
                            {focused && <Text style={{
                                color:Color.icon, paddingHorizontal:8
                            }}>{ route }</Text>}
                        </Animatable.View>
                    </View>
            </View>
        </TouchableOpacity>
  )
}

export default TabButton

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius:16
    }
})