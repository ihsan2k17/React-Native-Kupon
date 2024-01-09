import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/rootstack';
import ModalMenuCustomer from './modalmenucustomer';
import ModalMenuHadiah from './modalmenuhadiah';
import Color from '../constant/color';
import ModalMenuKupon from './modalmenukupon';

interface props {
    menuType: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    navigation: StackNavigationProp<RootStackParamList>
}
const renderModalContent = ({menuType, setModal, navigation}:props) => {
    return (
        <View style={{ backgroundColor: Color.icon, padding: 20, borderRadius: 10 }}>
            <TouchableOpacity onPress={() => setModal(false)}>
                <Text style={{ alignSelf: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>
                    Close
                </Text>
            </TouchableOpacity>
            {/* pada modalmenu ini akan ada beberapa kondisi jika user membuka menu customer maka 
            akan muncul pilihan yang ada di dalam modalmenucustomer dan begitu seterus nya*/}
            {menuType === 'customer' && ModalMenuCustomer({navigation,setModal})}
            {menuType === 'hadiah' && ModalMenuHadiah({ navigation, setModal })}
            {menuType === 'kupon' && ModalMenuKupon({navigation, setModal})}
            {/* Tambahkan opsi halaman lain sesuai kebutuhan */}
        </View>
    );
};

export default renderModalContent;

const styles = StyleSheet.create({})