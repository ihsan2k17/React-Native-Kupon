import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Sales } from '../../../models/sales';
import { FetchListSalesId } from '../../../service/fetchSales';
import Color from '../../constant/color';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface propssales {
    salesId: string;
    setSalesId: React.Dispatch<React.SetStateAction<string>>;
}
const DropdownListSalesForNakami = ({ salesId, setSalesId }: propssales) => {
    
    const [listSales, setListSales] = useState<Sales[]>([]);
    const [notificationModal, setNotificationModal] = useState('');
    const [dropdownSales, setDropdownSales] = useState(false);
    const [isRotated, setIsRotated] = useState(false);


    const toogledropdownSales = () => {
        setDropdownSales(!dropdownSales)
        setIsRotated(!isRotated)
    };

    const selected = (selectedValue: string) => {
        setSalesId(selectedValue)
        FetchListSalesId(setNotificationModal,setListSales)
        toogledropdownSales()
    };
    useEffect(() => {
        if (dropdownSales) {
            FetchListSalesId(setNotificationModal, setListSales)
        } 
    },[dropdownSales, setListSales])

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name={'wallet-giftcard'} size={24} color={Color.border} style={{ paddingRight: 5 }} />
            <TextInput
                placeholder="Sales *"
                value={salesId}
                keyboardType='name-phone-pad'
                onChangeText={(text) => setSalesId(text)}
                style={{ flex: 1, height: 40, borderBottomWidth: 1 }}
            />
            <TouchableOpacity onPress={toogledropdownSales}>
                <MaterialIcons
                    name='arrow-forward-ios'
                    size={18}
                    color={Color.border}
                    style={{ transform: [{ rotate: isRotated ? '180deg' : '90deg' }], height: 19 }} />
            </TouchableOpacity>
            <Modal isVisible={dropdownSales} backdropColor={Color.border} scrollHorizontal={false} statusBarTranslucent>
                <View style={{ backgroundColor: Color.icon, padding: 15, gap: 10, height: '60%' }}>
                    <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 5, borderRadius: 10 }}>
                        <FlatList
                            data={listSales}
                            keyExtractor={(item, index) => index.toString()}
                            maxToRenderPerBatch={5}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={() => {
                                        selected(item.SalesID);
                                        setIsRotated(!isRotated);
                                    }}
                                >
                                    <Text style={styles.listSales}>{item.Sales_Name}</Text>
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={() => (
                                <View style={{ backgroundColor: Color.icon, paddingHorizontal: 10 }}>
                                    <ActivityIndicator size="large" color={Color.border} />
                                </View>
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: Color.primary, padding: 10, borderRadius: 5 }}
                        onPress={() => { setDropdownSales(false); setIsRotated(!isRotated) }}>
                        <Text style={{ color: Color.icon }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default DropdownListSalesForNakami;

const styles = StyleSheet.create({
    listSales: {
        fontSize: 18,
        marginBottom: 10,
        color: 'black',
        textAlign: 'justify'
    },
})