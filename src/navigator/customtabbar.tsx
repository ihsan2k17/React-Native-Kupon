import { View, Text } from 'react-native'
import React from 'react'
import Color from '../components/constant/color'
import { BottomTabBar } from '@react-navigation/bottom-tabs'

const CustomBottomTab = (props:any) => {
  return (
    <View style={{backgroundColor: Color.icon}}>
      <BottomTabBar {...props}/>
    </View>
  )
}

export default CustomBottomTab