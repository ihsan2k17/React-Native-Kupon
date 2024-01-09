import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import Color from '../../constant/color';
import { FetchBarangPerPoin, FetchHadiahData } from '../../../service/fetchHadiah';
import { HadiahNKM } from '../../../models/hadiahNakami';
import { FetchBarangPerPoinNKM, FetchHadiahDataNKM, fetchPoinPerBarangNKM } from '../../../service/fetchHadiahNakami';
import { Poppins } from '../../constant/font';

interface DropdownNamaHadiahPorps {
    namahadiah: string,
    setNamahadiah: React.Dispatch<React.SetStateAction<string>>,
    hadiah: number | undefined,
    setHadiah: React.Dispatch<React.SetStateAction<number | undefined>>
}

const DropdownNamaHadiah = ({namahadiah, setNamahadiah, hadiah, setHadiah}:DropdownNamaHadiahPorps) => {
    const [listNamaHadiah, setListNamaHadiah] = useState<HadiahNKM[]>([]);
    const [isNamaHadiahDropdownVisible, setNamaHadiahDropdownVisible] = useState(false)
    const [isRotated, setIsRotated] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [notificationModal, setNotificationModal] = useState('');
    
    const toggleDropdown = () => {
        setNamaHadiahDropdownVisible(!isNamaHadiahDropdownVisible)
        setIsRotated(!isRotated)
    }

    const handleDropdownaselect = (selectedValue: string) => {
        if (setNamahadiah !== undefined) {
            setNamahadiah(selectedValue);
            fetchPoinPerBarangNKM(namahadiah, setHadiah, setModalType, setNotificationModal, setModal);
        }
        toggleDropdown()
    }
    useEffect(() => {
        if (isNamaHadiahDropdownVisible) {
            setNamahadiah('')
            if (hadiah === undefined) {
                FetchHadiahDataNKM(setListNamaHadiah, setNotificationModal, setModal)
            }
            FetchBarangPerPoinNKM(setListNamaHadiah, setNotificationModal, setModal, hadiah)
        }

    }, [isNamaHadiahDropdownVisible]);

    useEffect(() => {
        if (namahadiah) {
            fetchPoinPerBarangNKM(namahadiah, setHadiah, setModalType, setNotificationModal, setModal);
        }
    }, [namahadiah]);
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name={'wallet-giftcard'} size={24} color={Color.border} style={{ paddingRight: 5 }} />
            <TextInput
                placeholder="Nama Hadiah *"
                value={namahadiah}
                keyboardType='name-phone-pad'
                onChangeText={(text) => setNamahadiah(text)}
                style={{ height: 50, width: 291, borderBottomWidth: 1, fontSize:15, fontFamily:Poppins.SemiBold }}
            />
            <TouchableOpacity onPress={toggleDropdown}>
                <MaterialIcons
                    name='arrow-forward-ios'
                    size={18}
                    color={Color.border}
                    style={{ transform: [{ rotate: isRotated ? '180deg' : '90deg' }], height: 19 }} />
            </TouchableOpacity>
            <Modal isVisible={isNamaHadiahDropdownVisible}>
                <View style={{ backgroundColor: Color.icon, padding: 15, gap:20 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 170, backgroundColor: 'white' }}>
                        <FlatList
                            data={listNamaHadiah}
                            keyExtractor={(item, index) => index.toString()}
                            maxToRenderPerBatch={5}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={() => {
                                        handleDropdownaselect(item.Barang)
                                        setIsRotated(!isRotated);
                                    }}>
                                    <Text style={{
                                        fontSize: 18,
                                        marginBottom: 10,
                                        color: Color.text,
                                        textAlign: 'justify'
                                    }}>{item.Barang}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: Color.primary, padding: 10, borderRadius: 5 }}
                        onPress={() => { setNamaHadiahDropdownVisible(false); setIsRotated(!isRotated) }}>
                        <Text style={{ color: Color.icon }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default DropdownNamaHadiah;