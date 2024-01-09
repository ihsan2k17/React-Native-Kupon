import { View, Text, FlatList, TouchableOpacity, StyleSheet, Animated, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Customer } from '../../models/customer'
import { FetchCustomerTotalIdCustomer, handleSearchCustomer } from '../../service/fetchCustomer'
import { SafeAreaView } from 'react-native-safe-area-context'
import RenderCustomerPage from './rendercustomerpage'
import Color from '../../components/constant/color'
import { useNavigation } from '@react-navigation/native'
import DynamicHeader from '../../components/customer/headerCust/dynamicHeaderCust'
import ListHeaderCust from '../../components/customer/headerCust/listHeaderCust'

const CustomerPage = () => {
  const [customerData, setCustomerData] = useState<Customer[]>([])
  const [modalCustomer, setModalCustomer] = useState(false)
  const [pointerIndex, setPointerIndex] =useState(0)
  const [notificationModalCustomer, setNotificationModalCustomer] = useState('')
  const [searching, setSearching] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [refreshAnimation] = useState(new Animated.Value(0));
  const [refreshRotation, setRefreshRotation] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const isLoading = !customerData || customerData.length === 0;
  const scrollY = useRef(new Animated.Value(0)).current;
  const stickyTop = scrollY.interpolate({
    outputRange: [110, 0], // Memperkecil header saat di-scroll ke atas
    inputRange: [0, 110], // Sesuaikan dengan jarak scroll yang diinginkan
    extrapolate: 'clamp',
  });

  const stickyOpacity = scrollY.interpolate({
    outputRange: [1, 0], // Membesarakan opacity saat di-scroll ke atas
    inputRange: [0, 120], // Sesuaikan dengan jarak scroll yang diinginkan
    extrapolate: 'clamp',
  });

  useEffect(() => {
    FetchCustomerTotalIdCustomer(setCustomerData, setNotificationModalCustomer, setModalCustomer);
  }, []);
  
  useEffect(() => {
    FetchCustomerTotalIdCustomer(setCustomerData, setNotificationModalCustomer, setModalCustomer);
    if (!refresh) {
      refreshAnimation.setValue(1);
    }
  }, [refresh, refreshAnimation]);

  return (
    <SafeAreaView style={{backgroundColor:Color.icon}}>
      {/* Header */}
      <View style={{paddingTop:10}}>
        {isLoading ? (
          <View style={{backgroundColor:Color.icon, paddingHorizontal:10}}>
            <ListHeaderCust
              searching={searching}
              setSearching={setSearching}
              setCustomerData={setCustomerData}
              setNotificationModalCustomer={setNotificationModalCustomer}
              setModalCustomer={setModalCustomer}
              setRefresh={setRefresh}
              refreshAnimation={refreshAnimation}
              refreshRotation={refreshRotation}
              setRefreshRotation={setRefreshRotation}            />
            <ActivityIndicator size="large" color={Color.border} /> 
          </View>
        ) : (
            <>
              <Animated.View style={{
                backgroundColor: Color.icon,
                paddingHorizontal: 10,
                paddingBottom: 5,
                opacity: stickyOpacity,
                height:stickyTop
              }}>
                <ListHeaderCust
                  searching={searching}
                  setSearching={setSearching}
                  setCustomerData={setCustomerData}
                  setNotificationModalCustomer={setNotificationModalCustomer}
                  setModalCustomer={setModalCustomer}
                  setRefresh={setRefresh}
                  refreshAnimation={refreshAnimation}
                  refreshRotation={refreshRotation}
                  setRefreshRotation={setRefreshRotation}
                />
              </Animated.View>
              <FlatList
                data={customerData}
                showsHorizontalScrollIndicator={false}
                maxToRenderPerBatch={5}
                windowSize={10}
                contentContainerStyle={{
                  gap: 10,
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  borderRadius:20
                }}
                style={{ paddingHorizontal: 10, paddingTop:5 }}
                renderItem={({ item, index }) => (
                  <RenderCustomerPage item={item} index={index} pointerIndex={pointerIndex} setPointerIndex={setPointerIndex} />
                )}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                  useNativeDriver: false
                })}
              />
            </>
        )}
      </View>
      <View style={{
        position: isLoading ? 'relative' : 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        padding: 20
      }}>
        <TouchableOpacity style={{
          backgroundColor: Color.background,
          width: '30%',
          paddingVertical: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }} onPress={() => { navigation.navigate('AddCustomer' as never) }}>
          <Text>Add ID</Text>
        </TouchableOpacity>
      </View>
      <DynamicHeader
        searching={searching}
        setSearching={setSearching}
        setCustomerData={setCustomerData}
        scrollY={scrollY}
        setModalCustomer={setModalCustomer}
        setNotificationModalCustomer={setNotificationModalCustomer}
      />
    </SafeAreaView>
  )
}

export default CustomerPage

const styles = StyleSheet.create({
  
  AnimatedView: {
    height: 100,
    backgroundColor: Color.icon,
    position: 'absolute',
    justifyContent: 'flex-end',
    top: -100,
    left: 0,
    right: 0,
    elevation: 3,
    opacity: 1,
    paddingHorizontal: 10
  },
})