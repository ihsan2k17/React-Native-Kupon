import { FlatList, Image, NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputSubmitEditingEventData, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Agen } from '../../../models/agen';
import { FetchListIdAgen, FetchListNamaAgen, searchListNameAgen } from '../../../service/fetchAgen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../constant/color';
import Modal from 'react-native-modal';
import { Poppins } from '../../constant/font';
interface AgenProps {
    idAgen: string,
    setIdAgen: React.Dispatch<React.SetStateAction<string>>,
    setSalesId: React.Dispatch<React.SetStateAction<string>>,
}
const DropdownListAgenCust = ({idAgen, setIdAgen, setSalesId}:AgenProps) => {
    const navigation = useNavigation();
    const [listNamaAgen, setListNamaAgen] = useState<Agen[]>([]);
    const [notificationModal, setNotificationModal] = useState('');
    const [modal, setModal] = useState(false);
    const [dropdownAgen, setDropdownAgen] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalType, setModalType] = useState('');
    const [addAgen, setAddAgen] = useState(false);

    const toggledropdownagen = () => {
        setDropdownAgen(!dropdownAgen)
        setIsRotated(!isRotated)
    };

    const selected = (selectedValue: string) => {
        setIdAgen(selectedValue);
        toggledropdownagen();
        console.log('Selected ID Agen:', selectedValue);
        FetchListIdAgen(setIdAgen, setSalesId, idAgen, setNotificationModal, setModal, setModalType);
    }

    const onSubmitEditing = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const { text } = event.nativeEvent;
        setSearchQuery(text);
        await searchListNameAgen(searchQuery, setSearchQuery, setListNamaAgen, setNotificationModal, setModal, setModalType);
    };

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

    useEffect(() => {
        if (dropdownAgen) {
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
            } else {
                FetchListNamaAgen(setListNamaAgen, setNotificationModal, setModal)
            }
        };
        setAddAgen(listNamaAgen.length === 0);
    }, [dropdownAgen, searchQuery, listNamaAgen]);
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name={'wallet-giftcard'} size={24} color={Color.border} style={{ paddingRight: 5 }} />
            <TextInput
                placeholder="Agen *"
                value={idAgen}
                keyboardType='name-phone-pad'
                onChangeText={(text) => {
                    console.log('TextInput Value:', text);
                    setIdAgen(text);
                }}
                style={{ flex: 1, height: 40, borderBottomWidth: 1 }}
            />
            <TouchableOpacity onPress={toggledropdownagen}>
                <MaterialIcons
                    name='arrow-forward-ios'
                    size={18}
                    color={Color.border}
                    style={{ transform: [{ rotate: isRotated ? '180deg' : '90deg' }], height: 19 }} />
            </TouchableOpacity>
            <Modal isVisible={dropdownAgen} backdropColor={Color.border} scrollHorizontal={false} statusBarTranslucent>
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
                                    <Text style={styles.listAgen}>{item.Agen_Name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        {addAgen && (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                                <Text style={{ fontFamily: Poppins.SemiBold }}>Data tidak ada</Text>
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
                        onPress={() => { setDropdownAgen(false); setIsRotated(!isRotated) }}>
                        <Text style={{ color: Color.icon }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal isVisible={modal} backdropColor={Color.border} scrollHorizontal={false} statusBarTranslucent>
                {modalType === 'error-get-id' && errorRenderModal()}
            </Modal>
        </View>
    )
}

export default DropdownListAgenCust

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
    listAgen: {
        fontSize: 18,
        marginBottom: 10,
        color: Color.text,
        textAlign: 'justify'
    },
    inputSearch: {
        fontFamily: Poppins.SemiBold,
        paddingHorizontal: 15,
        width: '80%',
    },
})