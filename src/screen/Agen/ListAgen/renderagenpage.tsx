import { View, Text, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { Agen } from '../../../models/agen'
import Color from '../../../components/constant/color';
import { Poppins } from '../../../components/constant/font';

interface props {
  item: Agen;
  index: number;
}

const RenderAgenPage = ({item,index}:props) => {
  return (
    <View style={{ paddingHorizontal:10 }}>
      <ImageBackground
        source={require('../../../assets/images/bg_flat_customer_4.jpg')}
        imageStyle={{ borderRadius: 10 }}>
        <View style={{paddingVertical:5}}>
          <View style={{flexDirection:'row', paddingHorizontal:10, justifyContent:'space-between'}}>
            <Text style={{ fontSize: 16, fontFamily: Poppins.Bold }}>{item.AgenID}</Text>
            <Text style={{fontSize:15, fontFamily:Poppins.SemiBold}}>{item.Kota}</Text>
          </View>
          <View style={{paddingHorizontal:10}}>
            <Text style={{fontSize:15, fontFamily:Poppins.Bold}}>{item.Agen_Name}</Text>
          </View>
          <View style={{flexDirection:'row', paddingHorizontal:10, justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{fontSize:14, fontFamily:Poppins.SemiBold}}>{item.Sales_Name}</Text>
            <Text style={{fontSize:14, fontFamily:Poppins.SemiBold}}>{item.SalesID}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default RenderAgenPage;
const styles = StyleSheet.create({
  imageBackground: {
    padding: 10,
    borderRadius: 10,
    width: '100%'
  }
})