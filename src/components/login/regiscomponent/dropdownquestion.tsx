import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, TextInput } from 'react-native';
import Color from '../../constant/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Poppins } from '../../constant/font';

interface DropdownModalProps {
    isVisible: boolean;
    textInputPlaceHolder: string;
    textInputValue: string;
    settextInputValue: React.Dispatch<React.SetStateAction<string>>
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSelectOption: (option: string) => void;
    onClose: () => void;
    options: string[];
}

const DropdownModal: React.FC<DropdownModalProps> = ({ isVisible, setIsVisible,textInputPlaceHolder, textInputValue, settextInputValue, onSelectOption, onClose, options }) => {
    const [isRotated, setIsRotated] = useState(false);
    const toggleDropdown = () => {
        setIsVisible(!isVisible)
        setIsRotated(!isRotated)
    }
    return (
        <View style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            backgroundColor: Color.icon,
            paddingHorizontal: 10,
            borderRadius:10
        }}>
            <TouchableOpacity onPress={toggleDropdown} style={{ flexDirection: 'row' }} activeOpacity={0.8}>
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={18}
                    color={Color.border}
                    style={{ transform: [{ rotate: isRotated ? '180deg' : '90deg' }]}}/>
            </TouchableOpacity>
            <Modal visible={isVisible} transparent={true} animationType='slide' statusBarTranslucent>
                <View style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(55, 70, 92, 0.2)' // Semi-transparent background
                }}>
                    <View style={{
                        backgroundColor: Color.border,
                        padding: 20,
                        borderRadius: 10,
                        width: '80%', // Adjust the width of the modal content
                        maxHeight: '80%' // Adjust the maximum height of the modal content
                    }}>
                        {options.map((option, index) => (
                            <TouchableOpacity key={index}
                                onPress={() => {
                                    onSelectOption(option);
                                    onClose();
                                    setIsRotated(!isRotated);
                                }}>
                                <Text style={{
                                    fontSize: 18,
                                    marginBottom: 10, 
                                    color:Color.icon
                                }}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            onPress={() => { setIsVisible(false), setIsRotated(!isRotated) }}
                            style={{
                                alignItems:'center'
                            }}
                        >
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TextInput
                placeholder={textInputPlaceHolder}
                value={textInputValue}
                onChangeText={(text) => settextInputValue(text)}
                style={{ flex: 1, fontSize: 14, paddingLeft: 10, color:Color.border, fontFamily:Poppins.Regular }}
            />
        </View>
    );
};

export default DropdownModal;
