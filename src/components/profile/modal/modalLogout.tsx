import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import LoginModel from '../../../models/login';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/rootstack';
import Color from '../../constant/color';
import { Poppins } from '../../constant/font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
interface props {
    setModalLogout:React.Dispatch<React.SetStateAction<boolean>>
}
const ModalLogout = ({ setModalLogout }:props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'LoginScreen'>>();
    const handleOut = async () => {
        try {
            const token = await LoginModel.logout();
            console.log(token);
            navigation.navigate("LoginScreen" as never);
        } catch (error) {
            console.log('Logout Gagal', error);
        }
    };
    return (
        <View style={{padding:20}}>
            <View style={{
                backgroundColor: Color.icon,
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderRadius: 10,
                padding:10
            }}>
                <View style={{ padding: 10 }}>
                    <View style={{ alignItems: 'center', borderRadius: 5 }}>
                        <Image
                            source={require(`../../../assets/images/pxfuel-PULANG.jpg`)}
                            resizeMode='contain'
                            style={{ height:150, width:250, borderRadius:10 }} />
                    </View>
                </View>
                <View style={{ paddingBottom: 10, paddingHorizontal: 7, gap: 5, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 24, fontFamily: Poppins.Bold, color: Color.border }}>Warning!!!</Text>
                    <Text style={{ fontSize: 15, fontFamily: Poppins.Regular, color: Color.border, textAlign: 'center' }}>
                        Tombol Yes untuk Keluar, Tombol No untuk batal dan tombol (X) untuk cancel
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Color.primary,
                            borderRadius: 10,
                            padding: 5,
                            paddingHorizontal:20
                        }}
                        onPress={() => {
                            handleOut()
                            setModalLogout(false)
                        }}>
                        <Text style={{ fontSize: 15, fontFamily: Poppins.Bold, color: Color.icon }}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Color.border,
                            borderRadius: 10,
                            padding: 5,
                            paddingHorizontal:20
                        }}
                        onPress={() => {
                            setModalLogout(false)
                        }}>
                        <Text style={{ fontSize: 15, fontFamily: Poppins.Bold, color: Color.icon }}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <TouchableOpacity onPress={() => setModalLogout(false)} style={{
                    padding: 10, justifyContent: 'center', backgroundColor: Color.primary, alignItems: 'center', borderRadius: 25
                }}>
                    <MaterialIcons name={'close'} size={24} color={Color.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalLogout