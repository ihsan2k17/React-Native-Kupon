import { View, Text, NativeSyntheticEvent, TextInputSubmitEditingEventData, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Agen } from '../../../models/agen'
import { FetchKotaAgen } from '../../../service/fetchAgen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../constant/color';
import Modal from 'react-native-modal';
import ErrorModalAddAgen from '../modalagen/erroraddagen';
import { Poppins } from '../../constant/font';
interface props {
    kota: string,
    setKota: React.Dispatch<React.SetStateAction<string>>
}
const DropdownKota = ({ kota, setKota }: props) => {
    const [listKota, setListKota] = useState<Agen[]>([]);
    const [dropdownKota, setDropdownKota] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [notificationModal, setNotificationModal] = useState('');
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const toogledropdownKota = () => {
        setDropdownKota(!dropdownKota)
        setIsRotated(!isRotated)
    };
    const selected = (selectedValue: string) => {
        setKota(selectedValue)
        toogledropdownKota()
    };
    useEffect(() => {
        if (dropdownKota) {
            FetchKotaAgen(setListKota, setNotificationModal, );
        }
    },[dropdownKota])

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical:10 }}>
            <MaterialIcons name={'location-city'} size={24} color={Color.border} style={{ paddingRight: 5 }} />
            <TextInput
                placeholder="Kota *"
                value={kota !== undefined ? kota.toString() : '-'}
                keyboardType='name-phone-pad'
                onChangeText={(text) => setKota(text)}
                style={{ height: 40, flex: 1, borderBottomWidth: 1 }}
            />
            <TouchableOpacity onPress={toogledropdownKota}>
                <MaterialIcons
                    name='arrow-forward-ios'
                    size={18}
                    color={Color.border}
                    style={{ transform: [{ rotate: isRotated ? '180deg' : '90deg' }], height: 19 }} />
            </TouchableOpacity>
            <Modal isVisible={dropdownKota}>
                <View style={{ backgroundColor: Color.icon, padding: 15, gap: 20 }}>
                    {listKota.length === 0 ? (
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
                    ): (
                        <View style = {{ justifyContent: 'center', alignItems: 'center', height: 170, backgroundColor: 'white' }}>
                    <FlatList
                        data={listKota}
                        keyExtractor={(item, index) => index.toString()}
                        maxToRenderPerBatch={5}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={{ paddingHorizontal: 10 }}
                                onPress={() => {
                                    selected(item.Kota)
                                    setIsRotated(!isRotated);
                                }}>
                                <Text style={{
                                    fontSize: 18,
                                    marginBottom: 10,
                                    color: Color.text,
                                    textAlign: 'justify'
                                }}>{item.Kota}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                    )}
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: Color.primary, padding: 10, borderRadius: 5 }}
                        onPress={() => { setDropdownKota(!dropdownKota); setIsRotated(!isRotated) }}>
                        <Text style={{ color: Color.icon }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default DropdownKota
const styles = StyleSheet.create({
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
})