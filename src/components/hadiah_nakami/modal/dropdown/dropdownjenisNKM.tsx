import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../../constant/color';
import Modal from 'react-native-modal';
import { Jenis } from '../../../constant/poin';
interface props {
    jenis: string;
    setJenis: React.Dispatch<React.SetStateAction<string>>
}
const DropdownHadiahNakamiJenis = ({jenis, setJenis}:props) => {
    const [dropdownJenis, setDropdownJenis] = useState(false);
    const [isRotated, setIsRotated] = useState(false);

    const toggleDropdown = () => {
        setDropdownJenis(!dropdownJenis)
        setIsRotated(!isRotated)
    }

    const handleDropdownaselect = (selectedValue: string) => {
        setJenis(selectedValue);
        toggleDropdown()
    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name={'credit-card'} size={24} color={Color.border} style={{ paddingRight: 5 }} />
            <TextInput
                placeholder="Jenis *"
                value={jenis === undefined ? '' : jenis.toString()}
                keyboardType='name-phone-pad'
                onChangeText={(text) => {setJenis(text)}}
                style={{ height: 40, width: 278, borderBottomWidth: 1 }}
            />
            <TouchableOpacity onPress={toggleDropdown}>
                <MaterialIcons
                    name='arrow-forward-ios'
                    size={18}
                    color={Color.border}
                    style={{ transform: [{ rotate: isRotated ? '180deg' : '90deg' }], height: 19 }} />
            </TouchableOpacity>
            <Modal isVisible={dropdownJenis}>
                <View style={{ backgroundColor: Color.icon, padding: 15, gap: 20 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 170, backgroundColor: 'white' }}>
                        <FlatList
                            data={Jenis}
                            keyExtractor={(item, index) => index.toString()}
                            maxToRenderPerBatch={5}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={() => {
                                        handleDropdownaselect(item.label)
                                        setIsRotated(!isRotated);
                                    }}>
                                    <Text style={{
                                        fontSize: 18,
                                        marginBottom: 10,
                                        color: Color.text,
                                        textAlign: 'justify'
                                    }}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: Color.primary, padding: 10, borderRadius: 5 }}
                        onPress={() => { setDropdownJenis(false); setIsRotated(!isRotated) }}>
                        <Text style={{ color: Color.icon }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default DropdownHadiahNakamiJenis

const styles = StyleSheet.create({})