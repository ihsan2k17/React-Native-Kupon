import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Poppins } from '../../constant/font';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/rootstack';
import Color from '../../constant/color';
interface notifprops {
    notification:string,
    setModal:React.Dispatch<React.SetStateAction<boolean>>
}
const NotificationEditHadiahNakami = ({notification,setModal}:notifprops) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'hadiahNakamiPage'>>()
    return (
        <View style={{ backgroundColor: Color.icon, gap: 20 }}>
            <Text style={{ fontSize: 16, fontFamily: Poppins.Black, textAlign: 'center', color: Color.border }}>{notification}</Text>
            <TouchableOpacity
                style={{ backgroundColor: Color.border, padding: 10, paddingHorizontal: 30, borderRadius: 10 }}
                onPress={() => {
                    setModal(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'hadiahNakamiPage' }],
                    });
                }}
            >
                <Text style={{ fontSize: 16, fontFamily: Poppins.Black, textAlign: 'center', color: Color.icon }}>OK</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NotificationEditHadiahNakami

const styles = StyleSheet.create({})