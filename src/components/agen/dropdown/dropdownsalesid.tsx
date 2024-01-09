import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, NativeSyntheticEvent, TextInputSubmitEditingEventData, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../constant/color';
import Modal from 'react-native-modal'
import { FetchListSalesId, fetchSalesData, handleSearch } from '../../../service/fetchSales';
import { Sales } from '../../../models/sales';
import { Poppins } from '../../constant/font';
import { useNavigation } from '@react-navigation/native';

interface Props {
    salesId: string; setSalesId: React.Dispatch<React.SetStateAction<string>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
}
const DropdownSalesId = ({ salesId, setSalesId, setModal, setModalType }: Props) => {
    const navigation = useNavigation()
    const [listSales, setListSales] = useState<Sales[]>([]);
    const [dropdownSales, setDropdownSales] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [addSales, setAddSales] = useState(false);
    const [notificationModal, setNotificationModal] = useState('')
    
    const toogledropdownSales = () => {
        setDropdownSales(!dropdownSales)
        setIsRotated(!isRotated)
    };
    const selected = (selectedValue: string) => {
        setSalesId(selectedValue)
        FetchListSalesId(setNotificationModal, setListSales)
        toogledropdownSales()
    };
    const onSubmitEditing = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const { text } = event.nativeEvent;
        setSearchQuery(text);
        await handleSearch(setListSales, setSearchQuery, searchQuery, setModal, setModalType, setNotificationModal)
    };
    useEffect(() => {
        if (dropdownSales && listSales.length === 0) {
            if (searchQuery !== '') {
                if (listSales.length === 0 || searchQuery !== listSales[0]?.Sales_Name) {
                    // Jika searchQuery diisi, lakukan pencarian
                    handleSearch(setListSales, setSearchQuery, searchQuery, setModal, setModalType, setNotificationModal);
                }
            }
            else {
                // Jika dropdown dibuka dan listSales masih kosong, ambil daftar sales
                FetchListSalesId(setNotificationModal, setListSales);
            }
        };
        setAddSales(listSales.length === 0)
    }, [dropdownSales, listSales, searchQuery]);

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
                    {listSales.length === 0 ? (
                        <View style={styles.divContainer}>
                            <View style={{ padding: 20 }}>
                                <Image
                                    source={require('../../../assets/images/get_data_error.png')}
                                    style={{ height: 150 }}
                                    resizeMode='contain'
                                />
                            </View>
                            <Text style={styles.textTitleNotif}>ERROR</Text>
                            <Text style={styles.textNotif}>{notificationModal}</Text>
                        </View>
                    ) : (
                            <React.Fragment>
                                <View style={{ flexDirection: 'row', height: 50, borderWidth: 1, borderRadius: 15 }}>
                                    <TextInput
                                        placeholder='Search'
                                        style={styles.inputSearch}
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        onSubmitEditing={onSubmitEditing} />
                                </View>
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
                                                }}>
                                                <Text style={styles.listSales}>{item.Sales_Name}</Text>
                                            </TouchableOpacity>
                                        )} />
                                    {addSales && (
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                                            <Text style={{ fontFamily: Poppins.SemiBold }}>Data tidak ada</Text>
                                            <TouchableOpacity
                                                style={{ alignItems: 'center', backgroundColor: Color.primary, padding: 10, borderRadius: 5 }}
                                                onPress={() => {
                                                    navigation.navigate('AddCustomer' as never);
                                                    setDropdownSales(!dropdownSales);
                                                    setIsRotated(!isRotated);
                                                    // Tambahkan kode untuk menavigasi ke halaman "Add Agen" di sini
                                                }}
                                            >
                                                <Text style={{ color: Color.icon }}>Add Sales</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </React.Fragment>
                    )}
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

export default DropdownSalesId

const styles = StyleSheet.create({
    inputSearch: {
        fontFamily: Poppins.SemiBold,
        paddingHorizontal: 15,
        width: '80%',
    },
    listSales: {
        fontSize: 18,
        marginBottom: 10,
        color: Color.text,
        textAlign: 'justify'
    },
    divContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        backgroundColor: Color.icon
    },
    textTitleNotif: {
        fontFamily: Poppins.Bold,
        fontSize: 18,
        textAlign: 'center'
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
    }
})