import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {  } from 'react'
import Color from '../../constant/color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigator/rootstack';
import { StackNavigationProp } from '@react-navigation/stack';

interface props {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalInput = ({ setModal }: props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const handleInputKupon = () => {
        navigation.navigate('InputKupon');
        setModal(false)
    }
    const handleinputVoucher = () => {
        navigation.navigate('InputVoucher')
        setModal(false)
    }
    const tutupModal = () => {
        setModal(false);
    }
    return (
        <View style={{padding:10, gap:10}}>
            <View style={{flexDirection:'row', gap:10, justifyContent:'center'}}>
                <TouchableOpacity
                    style={[style.buttonCreate, { backgroundColor: Color.border }]}
                    onPress={handleInputKupon}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name={'add'} size={20} color={Color.icon} />
                        <Text style={style.textCreate}>Add New Kupon</Text>
                    </View>
                </TouchableOpacity>
                {/* button create voucher */}
                <TouchableOpacity
                    style={[style.buttonCreate, { backgroundColor: Color.border }]}
                    onPress={handleinputVoucher}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name={'add'} size={20} color={Color.icon} />
                        <Text style={style.textCreate}>Add New Voucher</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={tutupModal} style={style.buttonClose}>
                    <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 15 }}>close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default ModalInput
    
    const style = StyleSheet.create({
        BodyCreate: {
            position: 'absolute',
            top: 680,
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 30,
            justifyContent: 'space-between',
        },
        buttonCreate: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 15,
        },
        textCreate: {
            fontWeight: '400',
            color: Color.icon
        },
        buttonClose: {
            backgroundColor: Color.primary,
            padding: 10,
            width: 200,
            borderRadius: 15
        }
    })