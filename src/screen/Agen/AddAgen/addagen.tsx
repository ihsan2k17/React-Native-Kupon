import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Animated, Image, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from '../../../components/constant/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import FormAddAgen from '../../../components/agen/addagen/formaddagen';
import { Poppins } from '../../../components/constant/font';
import { CreateAgen } from '../../../service/fetchAgen';

const AddAgen = () => {
  const navigation = useNavigation()
  const [agenId, setAgenId] = useState('');
  const [agenName, setAgenName] = useState('');
  const [kota, setKota] = useState('');
  const [salesId, setSalesId] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [notificationModal, setNotificationModal] = useState('');
  const [modalInput, setModalInput] = useState(false);
  const [refreshAnimation] = useState(new Animated.Value(0));
  const [refreshRotation, setRefreshRotation] = useState(new Animated.Value(0));
  const scrollOffsetY = useRef(new Animated.Value(0)).current
  const maxHeader = 200;
  const minHeader = 0;
  const scrollDistance = maxHeader - minHeader
  const dynamicHeader = ({ value }: any) => {
    const animatedHeaderHeight = value.interpolate({
      inputRange: [0, scrollDistance],
      outputRange: [maxHeader, minHeader],
      extrapolate: 'clamp'
    })
    return (
      <Animated.View style={{
        height: animatedHeaderHeight, justifyContent: 'center', alignItems: 'center'
      }}>
        <Image
          source={require('../../../assets/images/add-customer.png')}
          resizeMode='contain'
          style={{
            height: '100%'
          }} />
      </Animated.View>
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: Color.icon, flex: 1, padding: 10, gap: 10 }}>
      <StatusBar backgroundColor={Color.icon} />
      {/* HEADER */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <TouchableOpacity style={styles.TouchableBack}
            onPress={() => {
              navigation.goBack()
            }}
          >
            <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
          </TouchableOpacity>
        </View>
      </View>
      {dynamicHeader({ value: scrollOffsetY })}
      {/* BODY */}
      <ScrollView
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          {
            useNativeDriver: false
          })}
      >
        <View>
          <FormAddAgen
            agenId={agenId} setAgenId={setAgenId}
            agenName={agenName} setAgenName={setAgenName}
            kota={kota} setKota={setKota}
            salesId={salesId} setSalesId={setSalesId}
            modal={modal} setModal={setModal}
            modalType={modalType} setModalType={setModalType}
            notificationModal={notificationModal} setNotificationModal={setNotificationModal} />
        </View>
        {/* FOOTER */}
        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, gap: 20 }}>
            <View>
              <TouchableOpacity style={{ backgroundColor: Color.border, padding: 10, flexDirection: 'row', borderRadius: 10 }}
                onPress={() => { navigation.navigate('AddCustomer' as never) }}
              >
                <MaterialIcons name='add' size={24} color={Color.icon} />
                <Text style={{ fontFamily: Poppins.SemiBold, color: Color.icon }}>Add Customer</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{ backgroundColor: Color.primary, padding: 10, borderRadius: 10 }}
                onPress={() => {
                  if (agenId !== undefined) {
                    CreateAgen(agenId, agenName, kota, salesId, setNotificationModal, setModal, setModalType)
                  } else {
                    console.log(agenId)
                  }
                }}
              >
                <Text style={{ fontFamily: Poppins.SemiBold, color: Color.icon }}>Add Agen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddAgen;

const styles = StyleSheet.create({
  TouchableBack: {
    backgroundColor: Color.border,
    borderRadius: 15,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
})