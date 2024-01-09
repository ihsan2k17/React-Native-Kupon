import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Color from '../constant/color'
import { Poppins } from '../constant/font'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
interface props {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    notificationModal: string
}
const ModalUpduration = ({ setModal, notificationModal }: props) => {
    const navigation = useNavigation();
    return (
        <View style={{ padding: 20 }}>
            <View style={styles.divContainer}>
                <View style={{ padding: 20 }}>
                    <Image
                        source={require('../../assets/images/get_data_success.png')}
                        style={{ height: 150 }}
                        resizeMode='contain'
                    />
                </View>
                <Text style={styles.textNotif}>{notificationModal}</Text>
            </View>
            <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <TouchableOpacity
                    onPress={() => { setModal(false); navigation.goBack(); }}
                    style={styles.buttonClose}>
                    <MaterialIcons name={'close'} size={24} color={Color.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalUpduration

const styles = StyleSheet.create({
    divContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        backgroundColor: Color.icon
    },
    textNotif: {
        fontFamily: Poppins.SemiBold,
        fontSize: 15,
        textAlign: 'center'
    },
    buttonClose: {
        padding: 10,
        justifyContent: 'center',
        backgroundColor: Color.primary,
        alignItems: 'center',
        borderRadius: 25
    },
})