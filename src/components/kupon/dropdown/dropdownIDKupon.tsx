import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchTahunHadiahNamaHadiahPeriodeJenisbyID } from '../../../service/fetchKupon';
import { FetchCustomerListId } from '../../../service/fetchCustomer';
import { Customer } from '../../../models/customer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../constant/color';
import Modal from 'react-native-modal';
import { Poppins } from '../../constant/font';

interface props {
    id:number|undefined;
    setId: React.Dispatch<React.SetStateAction<number | undefined>>;
    setTahun: React.Dispatch<React.SetStateAction<number | undefined>>;
    setHadiah: React.Dispatch<React.SetStateAction<number | undefined>>;
    setNamahadiah: React.Dispatch<React.SetStateAction<string>>;
    setPeriode: React.Dispatch<React.SetStateAction<number | undefined>>;
    setJenis: React.Dispatch<React.SetStateAction<string>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
}
const DropdownIDKupon = ({ id, setId, setTahun, setHadiah, setNamahadiah, setPeriode,
    setJenis, setModal, setNotificationModal, setModalType }: props) => {
    const [listID, setListID] = useState<Customer[]>([]);
    const [isIdDropdownVisible, setIdDropdownVisible] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [debouncedInput, setDebouncedInput] = useState('');

    const toggledropdownId = async () => {
        setIdDropdownVisible(!isIdDropdownVisible)
        setIsRotated(!isRotated)
    }
    const select = (selectedValue:number) => {
        if (isIdDropdownVisible) {
            setId(selectedValue);
            toggledropdownId();
        }
    }

    useEffect(() => {
        if (isIdDropdownVisible) {
            FetchCustomerListId(setListID, setNotificationModal, setModal)
        }
    }, [isIdDropdownVisible]);

    {/* useeffect disini berfungsi jika kita memilih id yg sebelum nya sudah ada datanya di database 
    maka pada pilihan tahun, hadiah, namahadiah, periode, jenis akan otomatis terisi*/ }
    useEffect(() => {
        if (id !== undefined) {
            fetchTahunHadiahNamaHadiahPeriodeJenisbyID(
                id, setTahun, setHadiah, setNamahadiah, setPeriode, setJenis,
                setModal, setModalType, setNotificationModal
            );
        }
    }, [id]);

    useEffect(() => {
        if (debouncedInput.length > 0) {
            const debounceTimeout = setTimeout(() => {
                setId(parseInt(debouncedInput) || undefined);
            }, 500); // Sesuaikan dengan kebutuhan Anda

            return () => clearTimeout(debounceTimeout);
        } else {
            // Jika input kosong, atur nilai ID tanpa menunggu timeout
            setId(undefined);
            return undefined;
        }
    }, [debouncedInput]);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name={'person-pin'} size={24} color={Color.border} style={{ paddingRight: 5 }} />
            <TextInput
                placeholder={'ID *'}
                value={debouncedInput || id?.toString()}
                keyboardType={'numeric'}
                onChangeText={(value) => setDebouncedInput(value)}
                style={{ height: 50, width: 100, borderBottomWidth: 1, fontSize: 15, fontFamily: Poppins.SemiBold }}
            />
            <TouchableOpacity onPress={toggledropdownId}>
                <MaterialIcons
                    name='arrow-forward-ios'
                    size={18}
                    color={Color.border}
                    style={{ transform: [{ rotate: isRotated ? '180deg' : '90deg' }], height: 19 }} />
            </TouchableOpacity>
            <Modal isVisible={isIdDropdownVisible}>
                <View style={{ backgroundColor: Color.icon, padding: 15, gap: 20, borderRadius: 20 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 170, backgroundColor: 'white', borderRadius: 10 }}>
                        <FlatList
                            data={listID}
                            keyExtractor={(item, index) => index.toString()}
                            maxToRenderPerBatch={5}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={() => { select(item.ID); setIsRotated(!isRotated)}}>
                                    <Text style={styles.TextStyleId}>{item.ID}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: Color.primary, padding: 10, borderRadius: 5 }}
                        onPress={() => { setIdDropdownVisible(!isIdDropdownVisible); setIsRotated(!isRotated) }}>
                        <Text style={{ color: Color.icon }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default DropdownIDKupon

const styles = StyleSheet.create({
    TextStyleId: {
        fontSize: 18,
        marginBottom: 10,
        color: Color.text,
        textAlign: 'justify'
    }
})