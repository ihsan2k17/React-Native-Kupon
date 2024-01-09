import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FetchListNamaAgen, FecthListIdAgenSalesKota, searchListNameAgen } from '../../../service/fetchAgen';
import { Agen } from '../../../models/agen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../constant/color';
import Modal from 'react-native-modal';
import { Poppins } from '../../constant/font';
import { useNavigation } from '@react-navigation/native';

interface props {
    customer: string,
    setCustomer: React.Dispatch<React.SetStateAction<string>>,
    setIdAgen: React.Dispatch<React.SetStateAction<string>>,
    setSalesId: React.Dispatch<React.SetStateAction<string>>,
    setKota: React.Dispatch<React.SetStateAction<string>>,
}
const DropdownListCustomer = ({ customer, setCustomer, setIdAgen, setSalesId, setKota }: props) => {
    const navigation = useNavigation();
    const [listNamaAgen, setListNamaAgen] = useState<Agen[]>([]);
    const [notificationModal, setNotificationModal] = useState('');
    const [modal, setModal] = useState(false);
    const [dropdownCustomer, setDropdownCustomer] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalType, setModalType] = useState('');
    const [addAgen, setAddAgen] = useState(false);


    const toogledropdownCustomer = () => {
        setDropdownCustomer(!dropdownCustomer)
        setIsRotated(!isRotated)
    };

    const selected = (selectedValue: string) => {
        setCustomer(selectedValue)
        FecthListIdAgenSalesKota(customer, setIdAgen, setSalesId, setKota,setNotificationModal, setModal, setModalType)
        toogledropdownCustomer()
    };

    const onSubmitEditing = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const { text } = event.nativeEvent;
        setSearchQuery(text);
        await searchListNameAgen(searchQuery, setSearchQuery, setListNamaAgen, setNotificationModal, setModal, setModalType);
    };

    useEffect(() => {
        if (dropdownCustomer) {
            if (searchQuery !== '') {
                if (listNamaAgen.length === 0 || searchQuery !== listNamaAgen[0]?.Agen_Name) {
                    searchListNameAgen(
                        searchQuery,
                        setSearchQuery,
                        setListNamaAgen,
                        setNotificationModal,
                        setModal,
                        setModalType
                    )
                }
            } else{
                FetchListNamaAgen(setListNamaAgen, setNotificationModal, setModal)
            }
        };
        setAddAgen(listNamaAgen.length === 0);
    }, [dropdownCustomer, searchQuery, listNamaAgen]);

    const errorRenderModal = () => (
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

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
            <MaterialIcons name={'wallet-giftcard'} size={24} color={Color.border} style={{ paddingRight: 5 }} />
            <TextInput
                placeholder="Customer *"
                value={customer}
                keyboardType='name-phone-pad'
                onChangeText={(text) => setCustomer(text)}
                style={{ flex: 1, height: 40, borderBottomWidth: 1 }}
            />
            <TouchableOpacity onPress={toogledropdownCustomer}>
                <MaterialIcons
                    name='arrow-forward-ios'
                    size={18}
                    color={Color.border}
                    style={{ transform: [{ rotate: isRotated ? '180deg' : '90deg' }], height: 19 }} />
            </TouchableOpacity>
            <Modal isVisible={dropdownCustomer} backdropColor={Color.border} scrollHorizontal={false} statusBarTranslucent>
                <View style={{ backgroundColor: Color.icon, padding: 15, gap: 10, height: '60%' }}>
                    <View style={{ flexDirection: 'row', height: 50, borderWidth: 1, borderRadius: 15 }}>
                        <TextInput
                            placeholder='Search'
                            style={styles.inputSearch}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={onSubmitEditing}
                        />
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 5, borderRadius: 10 }}>
                        <FlatList
                            data={listNamaAgen}
                            keyExtractor={(item, index) => index.toString()}
                            maxToRenderPerBatch={5}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={() => {
                                        selected(item.Agen_Name)
                                        setIsRotated(!isRotated);
                                    }}>
                                    <Text style={styles.listCustomer}>{item.Agen_Name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        {addAgen && (
                            <View style={{flex:1,justifyContent:'center', alignItems:'center', gap:5}}>
                                <Text style={{fontFamily:Poppins.SemiBold}}>Data tidak ada</Text>
                                <TouchableOpacity
                                    style={{ alignItems: 'center', backgroundColor: Color.primary, padding: 10, borderRadius: 5 }}
                                    onPress={() => {
                                        navigation.navigate('AddAgen' as never);
                                        // Tambahkan kode untuk menavigasi ke halaman "Add Agen" di sini
                                    }}
                                >
                                    <Text style={{ color: Color.icon }}>Add Agen</Text>
                                </TouchableOpacity>
                           </View> 
                        )}
                    </View>
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: Color.primary, padding: 10, borderRadius: 5 }}
                        onPress={() => { setDropdownCustomer(false); setIsRotated(!isRotated) }}>
                        <Text style={{ color: Color.icon }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal isVisible={modal} backdropColor={Color.border} scrollHorizontal={false} statusBarTranslucent>
                {modalType === 'error-get-id-sales-kota' && errorRenderModal()}
            </Modal>
        </View>
    )
}

export default DropdownListCustomer;

const styles = StyleSheet.create({
    inputSearch: {
        fontFamily: Poppins.SemiBold,
        paddingHorizontal: 15,
        width: '80%',
    },
    listCustomer: {
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