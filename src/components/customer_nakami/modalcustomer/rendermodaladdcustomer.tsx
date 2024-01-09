import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../../constant/color';
import { Poppins } from '../../constant/font';


interface props {
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType:React.Dispatch<React.SetStateAction<string>>,
    notificationModal: string
}

export const renderErrorModalCustomerNakami = ({setModal,setModalType,notificationModal}: props) => (
    <View style={{ padding: 20 }}>
        <View style={styles.divContainer}>
            <View style={{ padding: 20 }}>
                <Image
                    source={require('../../../assets/images/get_data_error.png')}
                    style={{ height: 150 }}
                    resizeMode='contain'
                />
            </View>
            <Text style={styles.textNotif}>{notificationModal}</Text>
        </View>
        <View style={{ position: 'absolute', top: 0, right: 0 }}>
            <TouchableOpacity
                onPress={() => {
                    setModal(false);
                    setModalType('')
                }}
                style={styles.buttonClose}>
                <MaterialIcons name='close' size={24} color={Color.icon} />
            </TouchableOpacity>
        </View>
    </View>
)


export const renderSuccessModalCustomerNakami = ({ setModal, setModalType, notificationModal }: props) => (
    <View style={{ padding: 20 }}>
        <View style={styles.divContainer}>
            <View style={{ padding: 20 }}>
                <Image
                    source={require('../../../assets/images/get_data_success.png')}
                    style={{ height: 150 }}
                    resizeMode='contain'
                />
            </View>
            <Text style={styles.textNotif}>{notificationModal}</Text>
        </View>
        <View style={{ position: 'absolute', top: 0, right: 0 }}>
            <TouchableOpacity
                onPress={() => {
                    setModal(false);
                    setModalType('')
                }}
                style={styles.buttonClose}>
                <MaterialIcons name='close' size={24} color={Color.icon} />
            </TouchableOpacity>
        </View>
    </View>
)

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