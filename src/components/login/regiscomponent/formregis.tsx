import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RegisterStyle from '../../../screen/Login/RegisterPage/registerStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../constant/color';
import DropdownModal from './dropdownquestion';
import { itemQuestion } from '../../constant/question';
import { handleRegister } from '../../../service/fetchLogin';
import Modal from 'react-native-modal';
import ModalErrorRegis from './modalerrorregis';
import SuccesRegis from './modalsuccessregis';
import { Poppins } from '../../constant/font';


const FormRegistrasi = () => {
    const [id, setId] = useState<number>();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
    const [regisError, setRegisError] = useState('');
    const [modal, setModal] = useState(false);
    const [modalErrorRegis, setModalErrorRegis] = useState(false);
    const [questionValue, setQuestionValue] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [questionValue2, setQuestionValue2] = useState('');
    const [isDropdownVisible2, setDropdownVisible2] = useState(false);
    const [questionValue3, setQuestionValue3] = useState('');
    const [isDropdownVisible3, setDropdownVisible3] = useState(false);
    

    const PasswordVisibility = () => {
        setSecurePassword(!securePassword);
    };

    const ConfirmPasswordVisibility = () => {
        setSecureConfirmPassword(!secureConfirmPassword);
    }

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleDropdownOptionSelect = (selectedValue: string) => {
        setQuestionValue(selectedValue);
        toggleDropdown();
    };

    const toggleDropdown2 = () => {
        setDropdownVisible2(!isDropdownVisible2);
    };

    const handleDropdownOptionSelect2 = (selectedValue: string) => {
        setQuestionValue2(selectedValue);
        toggleDropdown2();
    };

    const toggleDropdown3 = () => {
        setDropdownVisible3(!isDropdownVisible3);
    };

    const handleDropdownOptionSelect3 = (selectedValue: string) => {
        setQuestionValue3(selectedValue);
        toggleDropdown3();
    };
    return (
        <View style={RegisterStyle.FormRegis}>
            <View style={{ padding: 20, gap: 20 }}>
                <View style={RegisterStyle.BoxUsername}>
                    <MaterialIcons name="alternate-email" size={24} color={Color.border} />
                    <TextInput
                        placeholder="ID *"
                        value={id === 0 ? '' : undefined}
                        keyboardType='numeric'
                        onChangeText={(text) => setId(parseInt(text))}
                        style={RegisterStyle.textUsername}
                    />
                </View>
                <View style={RegisterStyle.BoxUsername}>
                    <MaterialIcons name="alternate-email" size={24} color={Color.border} />
                    <TextInput
                        placeholder="Username *"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        style={RegisterStyle.textUsername}
                    />
                </View>
                <View style={RegisterStyle.containerPassword}>
                    <MaterialIcons name="lock-outline" size={24} color={Color.border} />
                    <View style={RegisterStyle.boxPassword}>
                        <TextInput
                            placeholder="Password *"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={securePassword}
                            style={RegisterStyle.textPassword}
                        />
                        <TouchableOpacity onPress={PasswordVisibility} style={RegisterStyle.iconContainer} activeOpacity={1}>
                            <MaterialIcons
                                name={securePassword ? 'visibility-off' : 'visibility'}
                                size={24}
                                color={Color.border}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={RegisterStyle.containerPassword}>
                    <MaterialIcons name="lock-outline" size={24} color={Color.border} />
                    <View style={RegisterStyle.boxPassword}>
                        <TextInput
                            placeholder="Confirm Password *"
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={secureConfirmPassword}
                            style={RegisterStyle.textPassword}
                        />
                        <TouchableOpacity onPress={ConfirmPasswordVisibility} style={RegisterStyle.iconContainer} activeOpacity={1}>
                            <MaterialIcons
                                name={secureConfirmPassword ? 'visibility-off' : 'visibility'}
                                size={24}
                                color={Color.border}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <DropdownModal
                        isVisible={isDropdownVisible}
                        setIsVisible={setDropdownVisible}
                        onSelectOption={handleDropdownOptionSelect}
                        onClose={toggleDropdown}
                        options={itemQuestion.map(item => item.label)}
                        textInputValue={questionValue}
                        settextInputValue={(text) => setQuestionValue(text)}
                        textInputPlaceHolder={'Choose Questions 1'} />
                    <View style={RegisterStyle.BoxCredentials}>
                        <MaterialIcons name="description" size={24} color={Color.border} />
                        <TextInput
                            placeholder="Your Answer"
                            value={q1}
                            onChangeText={(text) => setQ1(text)}
                            style={RegisterStyle.textCredentials}
                        />
                    </View>
                </View>
                <View>
                    <DropdownModal
                        isVisible={isDropdownVisible2}
                        setIsVisible={setDropdownVisible2}
                        onSelectOption={handleDropdownOptionSelect2}
                        onClose={toggleDropdown2}
                        options={itemQuestion.map(item => item.label)}
                        textInputValue={questionValue2}
                        settextInputValue={(text) => setQuestionValue2(text)}
                        textInputPlaceHolder={'Choose Questions 1'} />
                    <View style={RegisterStyle.BoxCredentials}>
                        <MaterialIcons name="description" size={24} color={Color.border} />
                        <TextInput
                            placeholder="Your Answer"
                            value={q2}
                            onChangeText={(text) => setQ2(text)}
                            style={RegisterStyle.textCredentials}
                        />
                    </View>
                </View>
                <View>
                    <DropdownModal
                        isVisible={isDropdownVisible3}
                        setIsVisible={setDropdownVisible3}
                        onSelectOption={handleDropdownOptionSelect3}
                        onClose={toggleDropdown3}
                        options={itemQuestion.map(item => item.label)}
                        textInputValue={questionValue3}
                        settextInputValue={(text) => setQuestionValue2(text)}
                        textInputPlaceHolder={'Choose Questions 1'} />
                    <View style={RegisterStyle.BoxCredentials}>
                        <MaterialIcons name="description" size={24} color={Color.border} />
                        <TextInput
                            placeholder="Your Answer"
                            value={q3}
                            onChangeText={(text) => setQ3(text)}
                            style={RegisterStyle.textCredentials}
                        />
                    </View>
                </View>
                {regisError !== '' && (
                    <Modal isVisible={modalErrorRegis} statusBarTranslucent>
                        <ModalErrorRegis regisError={regisError} setModalErrorRegis={setModalErrorRegis} />
                    </Modal>
                )}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleRegister(id, username, password, confirmPassword, q1, q2, q3, setModal, setRegisError, setModalErrorRegis)}
                    style={[RegisterStyle.buttonlRegister]}>
                    <Text style={{ fontSize: 16, fontFamily:Poppins.Bold, color: Color.icon }}>Register</Text>
                </TouchableOpacity>
                <Modal isVisible={modal} statusBarTranslucent>
                    <SuccesRegis setModal={setModal}/>
                </Modal>
            </View>
        </View>
    )
}

export default FormRegistrasi