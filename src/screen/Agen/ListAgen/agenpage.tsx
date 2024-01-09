import { View, Text, TouchableOpacity, StyleSheet, Animated, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Color from '../../../components/constant/color'
import { useNavigation } from '@react-navigation/native'
import { Agen } from '../../../models/agen'
import { FetchAgen, searchAgen } from '../../../service/fetchAgen'
import RenderAgenPage from './renderagenpage'
import DynamicHeader from '../../../components/agen/headerAgen/dynamicHeader'
import ListHeader from '../../../components/agen/headerAgen/listHeader'


const AgenPage = () => {
  const navigation = useNavigation();
  const [agenData, setAgenData] = useState<Agen[]>([]);
  const [notification, setNotification] = useState('');
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalType, setModalType] = useState('');
  const [refresh, setRefresh] = useState(false)
  const [refreshAnimation] = useState(new Animated.Value(0));
  const [refreshRotation, setRefreshRotation] = useState(new Animated.Value(0));
  const isLoading = !agenData || agenData.length === 0;
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
    FetchAgen(setAgenData, setNotification, setModal)
  }, [searchQuery]);

  return (
    <SafeAreaView style={{backgroundColor:Color.icon, gap:10}}>
      {isLoading ?/*Periksa apakah data sedang dimuat*/ ( 
        <View style={{paddingHorizontal:10}}>
          {/*Tampilkan indikator loading jika sedang dimuat*/}
          <ListHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setAgenData={setAgenData}
            setModal={setModal}
            setNotification={setNotification}
            setModalType={setModalType}
            setRefresh={setRefresh}
            refreshAnimation={refreshAnimation}
            refreshRotation={refreshRotation}
            setRefreshRotation={setRefreshRotation}            
          />
          <ActivityIndicator size="large" color={Color.border} />
        </View>
      ) : (
          <>
            <Animated.View style={{
                backgroundColor: Color.icon,
                paddingHorizontal: 10,
                opacity: stickyOpacity,
                height: stickyTop
              }}>
              <ListHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setAgenData={setAgenData}
                setNotification={setNotification}
                setModal={setModal}
                setModalType={setModalType}
                setRefresh={setRefresh}
                refreshAnimation={refreshAnimation}
                refreshRotation={refreshRotation}
                setRefreshRotation={setRefreshRotation} 
              />
            </Animated.View>
            <FlatList
              data={agenData}
              showsHorizontalScrollIndicator={false}
              maxToRenderPerBatch={5}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: false
              })}
              windowSize={10}
              contentContainerStyle={{
                gap: 10,
                backgroundColor: 'white',
                paddingVertical: 10,
                borderRadius: 20
              }}
              style={{ paddingHorizontal: 10, paddingTop: 5 }}
              renderItem={({ item, index }) => (
                <RenderAgenPage item={item} index={index} />
              )}
            />
        </>
      )}
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
        }} onPress={() => { navigation.navigate('AddAgen' as never) }}>
          <Text>Add Agen</Text>
        </TouchableOpacity>
      </View>
      <DynamicHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setAgenData={setAgenData}
        setModal={setModal} setModalType={setModalType} setNotification={setNotification} scrollY={scrollY}
      />
    </SafeAreaView>
  )
}

export default AgenPage

const styles = StyleSheet.create({
  containercreate: {
    position: 'absolute',
    paddingVertical: 10,
    padding:10,
    bottom: 0, // Fleksibel di berbagai perangkat
    left: 0,
    right: 0,
  }, 
  buttoncreate: {
    paddingVertical: 10,
    borderRadius: 15,
    width: '35%',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: Color.background
  },
})