import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Poppins } from '../constant/font'
import Color from '../constant/color'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigator/rootstack'
interface props {
    navigation: StackNavigationProp<RootStackParamList>
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalMenuCustomer = ({ navigation, setModal }: props) => {
    /* pada dasar nya modal menu customer ini akan memuatkan 2 handle yang menuju halaman masing masing
    yaitu customer naiba atau pun nakami */
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                source={require('../../assets/icons/customer.png')}
                resizeMode='contain'
                style={{ height: 180, width: 180 }}
            />
            <View>
                <Text style={styles.textHeading}>
                    Pilih halaman Customer yang ingin Anda buka:
                </Text>
                <View style={styles.innerContainerModal}>
                    <TouchableOpacity
                        style={styles.buttonNaiba}
                        onPress={() => {
                            navigation.navigate('customerPage')
                            setModal(false)
                        }}>
                        <Text style={styles.textNaiba}>Naiba</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonNakami}
                        onPress={() => {
                            navigation.navigate('customerNakamiPage')
                            setModal(false)
                        }}>
                        <Text style={styles.textNakami}>Nakami</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ModalMenuCustomer

const styles = StyleSheet.create({
    textHeading: {
        fontSize: 16, marginBottom: 10, fontFamily: Poppins.Bold, textAlign: 'center'
    },
    innerContainerModal: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    buttonNaiba: {
        padding: 10,
        backgroundColor: Color.primary,
        borderRadius: 20,
        width: 100
    },
    textNaiba: {
        fontSize: 16,
        fontFamily: Poppins.Bold,
        color: Color.icon,
        textAlign: 'center'
    },
    buttonNakami: {
        padding: 10,
        backgroundColor: Color.border,
        borderRadius: 20,
        width: 100
    },
    textNakami: {
        fontSize: 16, fontFamily: Poppins.Bold, color: Color.icon, textAlign: 'center'
    }
})