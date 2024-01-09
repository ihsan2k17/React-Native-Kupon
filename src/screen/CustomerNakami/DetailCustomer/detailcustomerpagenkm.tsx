import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, FlatList, TextInput, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigator/rootstack';
import DetailRenderCustomer from './detailrendercustomer';
import Color from '../../../components/constant/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Poppins } from '../../../components/constant/font';
import { CustomerNkm } from '../../../models/customerNakami';
import { FetchCustomerNKMlistNamabyCustomer, handleRefreshNKM } from '../../../service/fetchCustomerNakami';

type DetailCustomerProps = {
  route: RouteProp<RootStackParamList, 'DetailCustomerNakamiPage'>;
}

const DetailCustomerNakamiPage = ({ route }: DetailCustomerProps) => {
  const { customernakamiCustomer } = route.params;
  const [customerData, setCustomerData] = useState<CustomerNkm[]>([])
  const [notificationModalCustomer, setNotificationModalCustomer] = useState('')
  const [modalCustomer, setModalCustomer] = useState(false)
  const [selectedPointerIndex, setSelectedPointerIndex] = useState<number>(-1);
  const [refresh, setRefresh] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [selectedNama, setSelectedNama] = useState('')
  const [selectedHP, setSelectedHP] = useState('')
  const [selectedIDAgen, setSelectedIDAgen] = useState('')
  const [selectedKota, setSelectedKota] = useState('')
  const [refreshAnimation] = useState(new Animated.Value(0));
  const [refreshRotation, setRefreshRotation] = useState(new Animated.Value(0));
  const [search, setSearch] = useState('')
  const navigation = useNavigation()
  const scrollY = useRef(new Animated.Value(0)).current;
  const stickyTop = scrollY.interpolate({
    outputRange: [-120,0],
    inputRange: [170,200],
    extrapolate:'clamp'
  })
  const stickyOpacity = scrollY.interpolate({
    outputRange: [0, 1],
    inputRange: [150, 200],
    extrapolate: 'clamp'
  })
  
  const dynamicHeader = () => {
    return (
      <Animated.View style={[styles.AnimatedView, {
        top: stickyTop,
        opacity: stickyOpacity
      }]}>
        <View style={{ paddingVertical: 10 }}>
          <View style={styles.containerSearch}>
            <TextInput
              placeholder='Search'
              style={styles.inputSearch}
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleSearch}
              style={{
                height: '100%',
                width: '17%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name='search' size={24} style={{ color: Color.border }} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    )
  }
  const theheaders = () => (
    <View style={styles.containerHeader}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, alignItems: 'center' }}>
        <TouchableOpacity style={styles.TouchableBack} onPress={() => {navigation.goBack()}}>
          <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
        </TouchableOpacity>
        <Text style={{ fontSize: 19, fontFamily: Poppins.ExtraBold, color: Color.border }}>Customer List Id</Text>
        <TouchableOpacity
          style={styles.TouchableBack}
          onPress={() => handleRefreshNKM(
            setRefresh,
            refreshAnimation,
            refreshRotation,
            setRefreshRotation,
            customernakamiCustomer,
            setCustomerData,
            setNotificationModalCustomer,
            setModalCustomer
          )} activeOpacity={1}>
          <Animated.View
            style={{
              alignItems: 'center', justifyContent: 'center',
              transform: [
                {
                  rotate: refreshRotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}>
            <MaterialIcons name='autorenew' size={24} color={Color.icon} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: 120 }}>
            <View style={{
              borderColor: Color.border, borderRadius: 50, borderWidth: 2, height: 90, width: 90, alignItems: 'center', justifyContent: 'center'
            }}>
              <Image
                source={require('../../../assets/images/customerProfile.png')}
                style={{ height: 70, width: 70, }}
                resizeMode='contain'
              />
            </View>
            <Text style={{ fontSize: 19, fontFamily: Poppins.ExtraBold, color: Color.border }}>{selectedCustomer}</Text>
          </View>
          <View style={{ alignItems: 'flex-start', justifyContent: 'center', paddingHorizontal: 20, gap: 5 }}>
            <View style={styles.rowIdentity}>
              <MaterialIcons name='home-filled' size={20} color={Color.border} />
              <Text style={{ fontFamily: Poppins.SemiBold, color: Color.border }}>{selectedNama}</Text>
            </View>
            <View style={styles.rowIdentity}>
              <MaterialIcons name='location-city' size={20} color={Color.border} />
              <Text style={{ fontFamily: Poppins.SemiBold, color: Color.border }}>{selectedKota}</Text>
            </View>
            <View style={styles.rowIdentity}>
              <MaterialIcons name='smartphone' size={20} color={Color.border} />
              <Text style={{ fontFamily: Poppins.SemiBold, color: Color.border }}>{selectedHP}</Text>
            </View>
            <View style={styles.rowIdentity}>
              <MaterialIcons name='support-agent' size={20} color={Color.border} />
              <Text style={{ fontFamily: Poppins.SemiBold, color: Color.border }}>{selectedIDAgen}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* SEARCH */}
      <View style={{ paddingVertical: 10 }}>
        <View style={styles.containerSearch}>
          <TextInput
            placeholder='Search'
            style={styles.inputSearch}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleSearch}
            style={{
              height: '100%',
              width: '17%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons name='search' size={24} style={{ color: Color.border }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  const handleSearch = () => {
    Alert.alert(
      'Peringatan',
      'Fitur Ini Belum Tersedia',
      [
        {
          text: 'Tutup',
          onPress: () => console.log('Tombol Tutup ditekan'),
        },
        // jika ingin menambahkan tombol tambahan di sini
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    FetchCustomerNKMlistNamabyCustomer(
      customernakamiCustomer,
      setCustomerData,
      setNotificationModalCustomer,
      setModalCustomer
    );
    if (!refresh) {
      refreshAnimation.setValue(1);
    }
  }, [refresh, refreshAnimation]);

  // Memperbarui selected data setelah pemanggilan FetchCustomerlistNamabyCustomer
  useEffect(() => {
    if (customerData.length > 0) {
      setSelectedCustomer(customerData[0].Customer);
      setSelectedNama(customerData[0].Nama);
      setSelectedHP(customerData[0].HP);
      setSelectedIDAgen(customerData[0].AgenId);
      setSelectedKota(customerData[0].Kota);
    }
  }, [customerData]);

  

  return (
    <SafeAreaView style={styles.containerSafeAreaView}>
      <Animated.View style={{
        flex: 1,
        opacity: refreshAnimation
      }}>
        <FlatList
          data={customerData}
          keyExtractor={(_, index) => index.toString()}
          maxToRenderPerBatch={5}
          numColumns={2}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false
          })}
          ListHeaderComponent={theheaders}
          columnWrapperStyle={{
            marginBottom: 10,
          }}
          nestedScrollEnabled={false}
          windowSize={10}
          renderItem={({ item, index }) => (
            <DetailRenderCustomer item={item} index={index} selectedPointerIndex={selectedPointerIndex} setSelectedPointerIndex={setSelectedPointerIndex} />
          )} />
      </Animated.View>
      <View style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,  
        padding: 20}}>
        <TouchableOpacity style={{
          backgroundColor: Color.background,
          width: '30%',
          paddingVertical: 10,
          alignItems: 'center',
          justifyContent:'center'
        }} onPress={() => {navigation.navigate('AddCustomerNakami' as never)}}>
          <Text>Add ID</Text>
        </TouchableOpacity>
      </View>
      { /* STICKY HEADER */}
      {dynamicHeader()}
    </SafeAreaView>
  )
}

export default DetailCustomerNakamiPage

const styles = StyleSheet.create({
  containerSafeAreaView: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.icon, paddingHorizontal:10
  },
  containerHeader: {
    paddingVertical:10,
    width: '100%',
    backgroundColor:Color.icon
  },
  AnimatedView: {
    height: 120,
    backgroundColor:Color.icon,
    position: 'absolute',
    justifyContent: 'flex-end',
    top: -120,
    left: 0,
    right: 0,
    elevation: 3,
    opacity: 1,
    paddingHorizontal:10
  },
  TouchableBack: {
    backgroundColor: Color.border,
    borderRadius: 15,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerSearch: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 20,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Color.border
  },
  inputSearch: {
    fontFamily: Poppins.SemiBold,
    paddingHorizontal: 15,
    width: '80%',
  },
  rowIdentity: {
    flexDirection: 'row',
    gap:10
  }
})