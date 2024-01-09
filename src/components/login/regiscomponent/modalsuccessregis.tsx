import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/rootstack';
import Color from '../../constant/color';
import { Poppins } from '../../constant/font';

interface props {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const SuccesRegis = ({ setModal }: props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'LoginScreen'>>();

    const handleKeTabstack = async () => {
        setModal(false)
        navigation.navigate("LoginScreen" as never);
    };
    return (
        <View style={{
            backgroundColor: Color.icon,
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
        }}>
            <View style={{
                backgroundColor: 'white',
                padding: 30,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                borderRadius: 10

            }}>
                <Image source={require('../../../assets/icons/icon_sukses.png')}
                    style={{ height: 100, width: 100, justifyContent: 'center', marginBottom: 10 }}
                />
            </View>
            <Text style={{
                fontSize: 18,
                fontFamily:Poppins.SemiBold,
                marginBottom: 20,
                color: Color.text,
                opacity: 0.7,
                textAlign: 'center'
            }}>Registrasi Kamu Berhasil</Text>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    backgroundColor: Color.border,
                    borderRadius: 15
                }}
                onPress={handleKeTabstack}
            >
                <Text style={{ color: Color.icon, fontSize: 16, fontFamily:Poppins.Regular, paddingHorizontal: 30 }}>Ok</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SuccesRegis