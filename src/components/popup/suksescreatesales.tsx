import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Color from '../constant/color'

interface SuksesSalesProps {
  closeModal: () => void;
}

const SuksesCreateSales = ({closeModal}: SuksesSalesProps) => {
  return (
    <View style={{
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: Color.icon
    }}>
      <View style={{
        alignItems: 'center',
      }}>
        <Image
          source={require('../../assets/icons/icon_sukses.png')}
          style={{
            height: 150,
            width: 150,
            marginBottom:10
        }} />
        <Text style={{fontSize: 18,fontWeight: 'bold',color:Color.primary
        }}>Success</Text>
        <Text style={{fontSize:14, fontWeight:'500', marginBottom:10}}>Data Sales Berhasil Ditambahkan</Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width: 100,
            borderRadius:10,
            backgroundColor: Color.border
          }}
          onPress={closeModal}
        >
          <Text style={{
            color: Color.icon,
            fontSize: 15,
            fontWeight:'500'
          }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SuksesCreateSales