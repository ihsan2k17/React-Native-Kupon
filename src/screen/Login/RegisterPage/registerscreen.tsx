import { View, Text, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/rootstack';
import RegisterStyle from './registerStyle';
import { SafeAreaView } from "react-native-safe-area-context";
import Color from '../../../components/constant/color';
import FormRegistrasi from '../../../components/login/regiscomponent/formregis';
import { Poppins } from '../../../components/constant/font';

const RegisterScreen = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'LoginScreen'>>();
  const [register, setRegister] = useState(true);
  

  const loginPress = () => {
    setRegister(false);
    navigation.navigate('LoginScreen' as never)
  }
  const registerPress = () => { 
    setRegister(true);
  }
  return (
    <ScrollView style={RegisterStyle.RegisterScreen} scrollEnabled={true}>
      <StatusBar backgroundColor={Color.icon} />
      <SafeAreaView style={{backgroundColor:Color.icon}}>
        <View style={{ flexDirection: 'row', gap: 30, justifyContent: 'flex-end', alignItems: 'center', paddingTop: 15, paddingRight: 20 }}>
          <View>
            <TouchableOpacity onPress={loginPress} activeOpacity={1}>
              <Text style={{fontSize: register ? 14 : 16, fontFamily:Poppins.Regular }}>Login</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={registerPress} activeOpacity={1}
              style={{ borderBottomWidth: 5, borderColor: Color.border }}>
              <Text style={{ fontSize: 20, fontFamily:Poppins.Bold,paddingBottom:10 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Image */}
        <View style={{ alignItems:'center'}}>
          <Image
            source={require('../../../assets/images/register.png')}
            style={{
              alignItems: 'center',
              height: 280,
              resizeMode: 'contain' // Menyesuaikan gambar dalam container tanpa distorsi
            }}
          />
        </View>
        <View style={RegisterStyle.ContainerRegister}>
          <View style={{ flexDirection: 'column', paddingTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontFamily:Poppins.Black, color: Color.border }}>Welcome New User</Text>
            <Text style={{ fontSize: 15, fontFamily:Poppins.SemiBold, color: Color.border }}>
              Jangan Lupa Diisi
            </Text>
          </View>
          {/* form register */}
          <FormRegistrasi />
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default RegisterScreen