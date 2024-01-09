import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginStyle from '../../../screen/Login/LoginPage/loginstyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import Color from '../../constant/color';
import ModalErrorLogin from './modalerrorLogin';
import SuccessLogin from './modalsuccessLogin';
import { handleLogin } from '../../../service/fetchLogin';
import { Poppins } from '../../constant/font';
import DeviceInfo from 'react-native-device-info';


const FormLogin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [securePassword, setSecurePassword] = useState(true);
    const [loginError, setLoginError] = useState('');
    const [modal, setModal] = useState(false);
    const [modalErrorLogin, setModalErrorLogin] = useState(false);
    const [device, setDevice] = useState('')
    const [version, setVersion] = useState('')

    useEffect(() => {
        const fetchDeviceInfo = async () => {
            const devip = await DeviceInfo.getBrand()
            const devname = await DeviceInfo.getDeviceName()
            setDevice(`${devip} ${devname}`);
            console.log(device);

            const devversion = await DeviceInfo.getSystemVersion();
            const devandro = await DeviceInfo.getSystemName();
            const devapi = await DeviceInfo.getApiLevel();
            setVersion(`${devandro} ${devversion} - Api ${devapi}`);
            console.log(version);
        }
        fetchDeviceInfo()
    },[])
    
    const PasswordVisibility = () => {
        setSecurePassword(!securePassword);
    };
    return (
        <View style={LoginStyle.formLogin}>
            <View style={{ paddingVertical: 5, gap: 10 }}>
                <View style={LoginStyle.BoxUsername}>
                    <MaterialIcons name="alternate-email" size={24} color={Color.border} />
                    <TextInput
                        placeholder="Username"
                      value={username}
                        onChangeText={(text) => {
                            setUsername(text);
                      }}
                        style={LoginStyle.textUsername}
                    />
                </View>
                <View style={LoginStyle.containerPassword}>
                    <MaterialIcons name="lock-outline" size={24} color={Color.border} />
                    <View style={LoginStyle.boxPassword}>
                      <TextInput
                          placeholder="Password"
                          value={password}
                          onChangeText={(text) => {
                              setPassword(text);
                          }}
                          secureTextEntry={securePassword}
                          style={LoginStyle.textPassword}
                        />
                        <TouchableOpacity onPress={PasswordVisibility} style={LoginStyle.iconContainer} activeOpacity={1}>
                            <MaterialIcons
                                name={securePassword ? 'visibility-off' : 'visibility'}
                                size={24}
                                color={Color.border}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {loginError !== '' && (
                    <Modal isVisible={modalErrorLogin}>
                        <ModalErrorLogin loginError={loginError} setModalErrorLogin={setModalErrorLogin}/>
                    </Modal>
                )}
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => {
                        handleLogin(username, password, device, version,setModal, setLoginError, setModalErrorLogin)
                    }}
                    style={[LoginStyle.buttonlLogin]}>
                    <Text style={{ fontSize: 16, fontFamily:Poppins.Bold, color: Color.icon }}>LOGIN</Text>
                </TouchableOpacity>
                <Modal isVisible={modal}>
                    <SuccessLogin setModal={setModal}/>
                </Modal>
            </View>
            <View style={LoginStyle.container}>
            </View>
        </View>
  )
}

export default FormLogin