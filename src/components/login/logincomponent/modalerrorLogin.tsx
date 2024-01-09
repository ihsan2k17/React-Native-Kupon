import { View, Text, TouchableOpacity } from 'react-native'
import React, { ReactNode, SetStateAction } from 'react'
import Color from '../../constant/color';
import { Poppins } from '../../constant/font';

interface props {
    loginError: string;
    setModalErrorLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalErrorLogin = ({loginError, setModalErrorLogin}: props) => {
  return (
      <View style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
      }}>
          <Text style={{
              fontSize: 18,
              fontFamily:Poppins.SemiBold,
              marginBottom: 10,
          }}>{loginError}</Text>
          <TouchableOpacity
              style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                  backgroundColor: Color.icon
              }}
              onPress={() => {
                  setModalErrorLogin(false);
              }}
          >
              <Text style={{ color: 'black', fontFamily:Poppins.Regular }}>Ok</Text>
          </TouchableOpacity>
      </View>
  )
}

export default ModalErrorLogin