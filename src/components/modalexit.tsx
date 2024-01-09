import { StyleSheet, Text, TouchableOpacity, View, BackHandler, Image } from 'react-native'
import React, { useEffect } from 'react'
import Color from './constant/color';
import { Poppins } from './constant/font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { handlLastExitApps } from '../service/fetchLogin';

interface props {
  setModalExit: React.Dispatch<React.SetStateAction<boolean>>,
  setString: React.Dispatch<React.SetStateAction<string>>
}
const ModalExit = ({ setModalExit, setString }: props) => {
 
  return (
    <View style={{padding:20}}>
      <View style={{ backgroundColor: Color.icon, borderRadius: 10 }}>
        <View style={{ paddingHorizontal: 15, paddingTop:15 }}>
          <View style={{ alignItems: 'center', borderRadius: 5, backgroundColor:'white', padding:10}}>
            <Image
              resizeMode='contain'
              source={require('../assets/images/8934921.png')} style={{ height: 150 }} />
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
          <View style={{gap:10}}>
            <Text style={{textAlign:'center', fontFamily:Poppins.Black, fontSize:20, color:Color.border}}>Peringatan</Text>
            <View style={{paddingBottom:20}}>
              <Text style={{ textAlign: 'center', fontFamily: Poppins.SemiBold, fontSize: 15, color: Color.border }}>
                Apakah Kamu Yakin Ingin Keluar ?</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ paddingVertical: 10,paddingHorizontal:30, backgroundColor: Color.primary, borderRadius:20 }}
            onPress={() => {
              handlLastExitApps(setString)
              BackHandler.exitApp();
              setModalExit(false);
            }}
          >
            <Text style={{ color: Color.icon, fontFamily: Poppins.Bold, fontSize: 15 }}>
              Ya
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: 'absolute', top: 0, right: 0 }}>
        <TouchableOpacity onPress={() =>
          setModalExit(false)}
          style={styles.buttonClose}>
          <MaterialIcons name={'close'} size={24} color={Color.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ModalExit

const styles = StyleSheet.create({
  buttonClose: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: Color.primary
  },
})