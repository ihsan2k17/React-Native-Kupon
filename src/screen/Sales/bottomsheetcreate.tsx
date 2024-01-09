import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import Color from '../../components/constant/color'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sales } from '../../models/sales';
import { handleCreateSales } from '../../service/fetchSales';
import Modal from "react-native-modal";
import SuksesCreateSales from '../../components/popup/suksescreatesales';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/rootstack';
import { StackNavigationProp } from '@react-navigation/stack';
import { Poppins } from '../../components/constant/font';

const BottomSheetSales = () => {
    const [idSales, setIdSales] = useState('');
    const [nama, setNama] = useState('');
    const [createData, setCreateData] = useState<Sales | null>(null);
    const [loading, setLoading] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const navi = useNavigation<StackNavigationProp<RootStackParamList,'salesPage'>>()

    const handleID = (value: React.SetStateAction<string>) => {
        setIdSales(value);
    };
    const handleNama = (value: string) => {
        setNama(value);
    };
    const handleSubmit = async () => {
        const salesData: Sales = {
            SalesID: idSales,
            Sales_Name: nama
        };
        await handleCreateSales(setLoading, setCreateData, salesData);
        setCreateSuccess(true);
    };
    const closeModal = () => {
        setCreateSuccess(false)
    };
    return (
        <SafeAreaView style={styles.bottomScreen}>
            <View style={{paddingBottom:10}}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '800',
                    color: Color.text,
                    opacity:0.6
                }}>Add Sales</Text>
            </View>
            <View style={styles.containerInput}>
                <View>
                    <Text>Kode Sales</Text>
                    <TextInput
                        style={styles.TextInput}
                        onChangeText={handleID}
                        value={idSales}
                        placeholder="Kode Sales *"
                    />
                </View>
                <View>
                    <Text>Nama Sales</Text>
                    <TextInput
                        style={styles.TextInput}
                        onChangeText={handleNama}
                        value={nama}
                        placeholder="Nama Sales "
                    />
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={{ alignItems: 'center', backgroundColor: Color.primary, padding: 10, borderRadius:20 }}>
                        <Text style={{ fontSize: 17, fontFamily: Poppins.Bold, color: Color.icon }}>submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal isVisible={createSuccess}>
                <SuksesCreateSales closeModal={closeModal} />
            </Modal>
        </SafeAreaView>
    )
}

export default BottomSheetSales

const styles = StyleSheet.create({
    TextInput: {
        height: 40,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor:Color.icon,
        paddingLeft:12
    },
    containerInput: {
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 20
    },
    bottomScreen: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: Color.icon
    }
})