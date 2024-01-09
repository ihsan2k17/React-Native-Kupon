import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text, StatusBar, Image, KeyboardAvoidingView, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/rootstack";
import LoginStyle from "./loginstyle";
import { SafeAreaView } from "react-native-safe-area-context";
import Color from "../../../components/constant/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormLogin from "../../../components/login/logincomponent/formlogin";
import { Poppins } from "../../../components/constant/font";
import Modal from "react-native-modal";
import ModalExit from "../../../components/modalexit";


const LoginScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ForgotScreen'|'RegisterScreen'>>();
  const [login, setLogin] = useState(true);
  const [modalExit, setModalExit] = useState(false);
  const [alert, setAlert] = useState('')

  const registerPress = () => {
    setLogin(false);
    navigation.navigate('RegisterScreen'as never)
  }

  const ForgotPress = () => {
    setLogin(false);
    navigation.navigate('ForgotScreen' as never)
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setModalExit(true);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [modalExit])
  );

  return (
    <View style={LoginStyle.LoginScreen}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <SafeAreaView style={LoginStyle.LoginAreaView}>
        <View style={{flexDirection:'row',gap:30, justifyContent:'flex-end', alignItems:'center', paddingTop:15,  paddingRight:20}}>
          <View style={{ borderBottomWidth: 5, borderColor: Color.border }}>
            <Text style={{ fontSize: 20, fontFamily:Poppins.Bold }}>Login</Text>
          </View>
          <View>
            <TouchableOpacity onPress={registerPress} activeOpacity={1}>
              <Text style={{fontSize: login ? 13 : 16, fontFamily:Poppins.Regular}}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          {/* Image */}
          <View style={{
            height: "40%", // Menyesuaikan tinggi gambar berdasarkan kondisi formTyping
            paddingTop: 10,
          }}>
            <Image
              source={require('../../../assets/images/login.png')}
              style={{
                height: "100%",
                width: "100%",
                resizeMode: 'contain' // Menyesuaikan gambar dalam container tanpa distorsi
              }}
            />
          </View>
          <View style={[LoginStyle.containerLogin]}>
            <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'center' }}>
              <Text style={{ fontSize: 30, color: Color.border, fontFamily: Poppins.Black }}>Hi, Welcome</Text>
              <Text style={{ fontSize: 15, fontFamily: Poppins.Medium, color: Color.border }}>
                Login dulu gais
              </Text>
            </View>
            {/* form login */}
            <FormLogin/>
          </View>
        </KeyboardAvoidingView>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          top: 19,
          flexDirection: 'row'
        }}>
          <Text style={{ fontSize: 15, fontFamily: Poppins.SemiBold, color: Color.border }}>Lupa Password ? </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={ForgotPress}>
            <Text style={{ fontSize: 15, fontFamily: Poppins.SemiBoldItalic, color: Color.border }}>Yuk Kesini aja</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={modalExit} backdropColor={Color.text} backdropOpacity={0.8}>
          <ModalExit setModalExit={setModalExit} setString={setAlert} />
        </Modal>
      </SafeAreaView>
    </View>
  )
}

export default LoginScreen;
