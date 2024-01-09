import { View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef } from 'react'
import BottomSheet, { BottomSheetRefProps } from '../components/bottomsheet';

const BottomSheetScreen = () => {
    const ref = useRef<BottomSheetRefProps>(null);
    const onPress = useCallback(() => {

        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(0);
        } else {
            ref?.current?.scrollTo(-300);
        }
    }, []);
    return (
        <View style={{flex:1}}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle="dark-content" />
            <View style={styles.container}>
                <TouchableOpacity style={
                    styles.button}
                    onPress={onPress} >
                    </TouchableOpacity>
                <Text style={{ color: '#fff' }}>App</Text>
            </View>
            <BottomSheet ref={ref}>
                <View style={{ flex: 1, backgroundColor: 'orange' }}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text>asal kita percaya dengan yang maha segalanya</Text>
                    </View>
                    <View>
                    </View>
                </View>
            </BottomSheet>
        </View>
    )
    }

export default BottomSheetScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 50,
        borderRadius: 25,
        aspectRatio: 1,
        backgroundColor: 'orange',
        opacity: 0.6,
    }
})