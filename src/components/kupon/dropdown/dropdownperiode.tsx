import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Hadiah } from '../../../models/hadiah';
import { FetchHadiahGetPeriode, FetchPeriodeData } from '../../../service/fetchHadiah';
import Modal from 'react-native-modal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../constant/color';
interface props {
    periode: number | undefined,
    setPeriode:React.Dispatch<React.SetStateAction<number|undefined>>
}
const DropdownPeriode = ({periode, setPeriode}: props) => {
    const [hadiahData, setHadiahData] = useState<Hadiah[]>([]);
    const [periodeDropdownVisible, setPeriodeDropdownVisible] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [modal, setModal] = useState(false);
    const [notificationModal, setNotificationModal] = useState('');

    const toggleDropdown = () => {
        setPeriodeDropdownVisible(!periodeDropdownVisible)
        setIsRotated(!isRotated)
    }

    const handleDropdownaselect = (selectedValue: number) => {
        setPeriode(selectedValue);
        toggleDropdown()
    }
    useEffect(() => {
        if (periodeDropdownVisible) {
            if (periode === undefined) {
                FetchPeriodeData(setHadiahData, setNotificationModal, setModal)
            }
        }

    }, [periodeDropdownVisible])

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name={'account-balance-wallet'} size={24} color={Color.border} style={{ paddingRight: 5 }} />
            <TextInput
                placeholder="Periode *"
                value={periode === undefined ? '' : periode.toString()}
                keyboardType='numeric'
                onChangeText={(text) => {
                    if (text === '') {
                        setPeriode(undefined); // Atau nilai default yang sesuai
                    } else {
                        setPeriode(parseInt(text));
                    }
                }}
                style={{ height: 40, width: 291, borderBottomWidth: 1 }}
            />
            <TouchableOpacity onPress={toggleDropdown}>
                <MaterialIcons
                    name='arrow-forward-ios'
                    size={18}
                    color={Color.border}
                    style={{ transform: [{ rotate: isRotated ? '180deg' : '90deg' }], height: 19 }} />
            </TouchableOpacity>
            <Modal isVisible={periodeDropdownVisible}>
                <View style={{ backgroundColor: Color.icon, padding: 15, gap: 20 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 170, backgroundColor: 'white' }}>
                        <FlatList
                            data={hadiahData}
                            keyExtractor={(item, index) => index.toString()}
                            maxToRenderPerBatch={5}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={() => {
                                        handleDropdownaselect(item.Periode)
                                        setIsRotated(!isRotated);
                                    }}>
                                    <Text style={{
                                        fontSize: 18,
                                        marginBottom: 10,
                                        color: Color.text,
                                        textAlign: 'justify'
                                    }}>{item.Periode}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: Color.primary, padding: 10, borderRadius: 5 }}
                        onPress={() => { setPeriodeDropdownVisible(false); setIsRotated(!isRotated) }}>
                        <Text style={{ color: Color.icon }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default DropdownPeriode

const styles = StyleSheet.create({})