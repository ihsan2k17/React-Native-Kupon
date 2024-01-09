import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardTypeOptions } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../../constant/color';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';

interface propsInput {
    isVisible: boolean;
    textInputPlaceHolder: string;
    textInputValue?: string | undefined;
    settextInputValue: (value: string) => void;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSelectOption: (option: string | number) => void;
    onClose: () => void;
    options: option[];
    materialIcon: string;
    keyboardType: KeyboardTypeOptions
}

type option = string | number

const DropdownEditVoucher = ({
    isVisible,
    textInputPlaceHolder,
    textInputValue,
    settextInputValue,
    setIsVisible,
    onSelectOption,
    onClose,
    options,
    materialIcon,
    keyboardType
}: propsInput) => {

    const [isRotated, setIsRotated] = useState(false);
    const toggleDropdown = () => {
        setIsVisible(!isVisible)
        setIsRotated(!isRotated)
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name={materialIcon} size={24} color={Color.border} style={{ paddingRight: 5 }} />
            <TextInput
                placeholder={textInputPlaceHolder}
                value={textInputValue}
                keyboardType={keyboardType}
                onChangeText={settextInputValue}
                style={{ height: 40, width: 100, borderBottomWidth: 1 }}
            />
            <TouchableOpacity onPress={toggleDropdown}>
                <MaterialIcons
                    name='arrow-forward-ios'
                    size={18}
                    color={Color.border}
                    style={{ transform: [{ rotate: isRotated ? '180deg' : '90deg' }], height: 19 }} />
            </TouchableOpacity>
            <Modal isVisible={isVisible}>
                <View style={{ backgroundColor: Color.icon, padding: 15, gap: 20, borderRadius: 20 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 170, backgroundColor: 'white', borderRadius: 10 }}>
                        <FlatList
                            data={options}
                            keyExtractor={(item, index) => index.toString()}
                            maxToRenderPerBatch={5}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={() => {
                                        onSelectOption(item);
                                        onClose();
                                        setIsRotated(!isRotated);
                                    }}>
                                    <Text style={{
                                        fontSize: 18,
                                        marginBottom: 10,
                                        color: Color.text,
                                        textAlign: 'justify'
                                    }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: Color.primary, padding: 10, borderRadius: 5 }}
                        onPress={() => { onClose(); setIsRotated(!isRotated) }}>
                        <Text style={{ color: Color.icon }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default DropdownEditVoucher;