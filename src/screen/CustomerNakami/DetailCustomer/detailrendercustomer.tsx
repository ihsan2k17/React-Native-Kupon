import { View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import { Customer } from '../../../models/customer'
import Color from '../../../components/constant/color';
import { Poppins } from '../../../components/constant/font';
import { CustomerNkm } from '../../../models/customerNakami';

interface props {
    item: CustomerNkm;
    index: number;
    selectedPointerIndex: number;
    setSelectedPointerIndex: (index: number) => void;
  
}
const DetailRenderCustomerNakami = ({ item, index, selectedPointerIndex, setSelectedPointerIndex }: props) => {
  const isSelected = index === selectedPointerIndex;
  const colors = [Color.primary, Color.secondary, Color.blue1Primary, Color.border];
  const colorindeks = index % colors.length;


  return (
    <View style={{paddingHorizontal:10,width:'50%', alignItems:'center'}}>
      <TouchableOpacity
        style={{
          backgroundColor: isSelected ? 'white' : colors[colorindeks],
          width: '100%',
          borderRadius: 15
        }}
        activeOpacity={1}
      >
        <ImageBackground source={require('../../../assets/images/bg_flat_customer_1.png')} imageStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%', // Sesuaikan tinggi gambar latar belakang dengan kebutuhan Anda
          borderRadius: 15,
          opacity:0.6
        }}>
          <View style={{ padding: 10 }}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{ color: isSelected ? Color.border : 'white', fontSize: 15.5, fontFamily:Poppins.ExtraBold }}>{item.ID}</Text>
              <Text style={{ color: isSelected ? Color.border : 'white', fontSize: 15, fontFamily:Poppins.SemiBold }}>{item.User_Input}</Text>
            </View>
            <Text style={{color: isSelected ? Color.border :'white', fontSize:14, fontFamily:Poppins.Regular }}>{item.Alamat}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}

export default DetailRenderCustomerNakami