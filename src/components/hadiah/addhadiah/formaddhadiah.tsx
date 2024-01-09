import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../../constant/color';
import DropdownPeriode from '../modal/dropdown/dropdownperiode';
import DropdownHadiahJenis from '../modal/dropdown/dropdownjenis';
interface form {
    hadiah: number | undefined;
    barang: string;
    periode: number|undefined;
    jenis: string;
    setHadiah: React.Dispatch<React.SetStateAction<number | undefined>>;
    setBarang: React.Dispatch<React.SetStateAction<string>>;
    setPeriode: React.Dispatch<React.SetStateAction<number|undefined>>;
    setJenis:React.Dispatch<React.SetStateAction<string>>
}
const FormAddHadiah = ({hadiah, barang, periode, jenis, setHadiah, setBarang, setPeriode, setJenis}:form) => {
  return (
      <View style={{
          backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 10,
          borderRadius: 20, gap: 5, width: '100%'
      }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="control-point" size={24} color={Color.border} style={{ paddingRight: 5 }} />
              <TextInput
                  placeholder="Hadiah *"
                  value={hadiah === 0 ? '' : undefined}
                  keyboardType='numeric'
                  onChangeText={(text) => setHadiah(parseInt(text))}
                  style={{ height: 40, flex: 1, borderBottomWidth: 1 }}
              />
              <View style={{ width: 19 }}></View>
          </View>
          <DropdownPeriode periode={periode} setPeriode={setPeriode} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="wallet-giftcard" size={24} color={Color.border} style={{ paddingRight: 5 }} />
              <TextInput
                  placeholder="Nama Hadiah *"
                  value={barang}
                  keyboardType='name-phone-pad'
                  onChangeText={(text) => setBarang(text)}
                  style={{ height: 40, flex: 1, borderBottomWidth: 1 }}
              />
              <View style={{ width: 19 }}></View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <DropdownHadiahJenis jenis={jenis} setJenis={setJenis} />
          </View>
      </View>
  )
}

export default FormAddHadiah

const styles = StyleSheet.create({})