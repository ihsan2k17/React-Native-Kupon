import { View, Text, Animated, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Customer } from '../../../models/customer'
import { fetchCurrentListNamaByCustomer } from '../../../service/fetchCustomer'
import { Poppins } from '../../../components/constant/font'
import Color from '../../../components/constant/color'

interface props {
    customerData: Customer[]
    setCustomerData: React.Dispatch<React.SetStateAction<Customer[]>>
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>
    setModalType: React.Dispatch<React.SetStateAction<string>>
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    refreshAnimation: Animated.Value
    refresh: boolean
}

const ListCurrentCustomer = ({
    customerData, setCustomerData, setNotificationModal,
    setModalType, setModal, refresh,refreshAnimation }: props) => {
    
    useEffect(() => {
        fetchCurrentListNamaByCustomer(
            setCustomerData,
            setNotificationModal,
            setModal,
            setModalType
        );
        if (!refresh) {
            refreshAnimation.setValue(1);
        }
    }, [refresh, refreshAnimation])
  return (
      <View style={styles.Container}>
          <View style={{paddingTop:10}}>
              <Text style={{fontFamily:Poppins.Bold, fontSize:20, color:Color.border, textAlign:'center'}}>Current Data Customer</Text>
          </View>
          {customerData.map((customer, index) => (
              <View key={index} style={styles.DivContainer}>
                  <ImageBackground
                      source={require('../../../assets/images/bg_flat_customer_2.jpg')}
                      imageStyle={styles.imageBackground}
                  >
                      <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingTop:10}}>
                          <Text style={{ color: 'white', fontFamily: Poppins.Bold, fontSize:17 }}>{customer.ID}</Text>
                          <Text style={{ color: 'white', fontFamily: Poppins.Bold, fontSize:17 }}>{customer.Customer}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal:10, paddingBottom:10 }}>
                          <Text style={{ color: 'white', fontFamily: Poppins.Bold, fontSize:13.5 }}>{customer.User_Input}</Text>
                          <Text style={{ color: 'white', fontFamily: Poppins.Bold, fontSize:13.5 }}>{customer.SalesId}</Text>
                      </View>
                  </ImageBackground>
              </View>
          ))}
      </View>
  )
}

export default ListCurrentCustomer

const styles = StyleSheet.create({
    Container: {
        flex:1,
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius:10
    },
    DivContainer: {
        flex:1,
        paddingBottom: 10,
        paddingHorizontal:10,
        borderRadius:30
    },
    imageBackground: {
        padding: 10,
        borderRadius: 10,
        width:'100%'
    }
})