import { View, Text, StatusBar, FlatList, StyleSheet, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData, Image, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Color from '../../components/constant/color'
import { Sales } from '../../models/sales'
import RenderItem from './renderitem'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { fetchSalesData, handleSearch } from '../../service/fetchSales'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomSheet, { BottomSheetRefProps } from '../../components/bottomsheet'
import { useNavigation } from '@react-navigation/native'
import BottomSheetSales from './bottomsheetcreate'

const SalesPage = () => {
  const [salesData, setSalesData] = useState<Sales[]>([]);
  const [searchSalesQuery, setSearchSalesQuery] = useState("");
  const [searchSalesData, setSearchSalesData] = useState<Sales[]>([]);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [notificationModal, setNotificationModal] = useState('');
  const isLoading = !salesData || salesData.length === 0;
  const nav = useNavigation();
  const ref = useRef<BottomSheetRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-300);
    }
  }, []);


  useEffect(() => {
    fetchSalesData(setSalesData);
  }, []);

  const onSubmitEditing = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const { text } = event.nativeEvent;
    setSearchSalesQuery(text);
    await handleSearch(setSearchSalesData, setSearchSalesQuery, searchSalesQuery, setModal, setModalType, setNotificationModal);
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.icon, paddingBottom:110 }}>
      <StatusBar backgroundColor={Color.icon} translucent/>
      <View>
        {/* header */}
        <View style={styles.containerHeader}>
          <View style={{
            flex: 1,
            position: 'absolute',
            left: 20,
            top:15
          }}>
            <TouchableOpacity
              style={{
                width: 40,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 52,
                backgroundColor: Color.border,
              }}
              onPress={() => {
                nav.goBack()
              }}
            >
              <MaterialIcons name='arrow-back' size={24} color={Color.icon}/>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 30 }}>Sales</Text>
          </View>
          <View style={styles.garisheader} />
        </View>
        {/* search */}
        <View style={{
          paddingHorizontal: 20,
          paddingBottom: 10,
          paddingTop: 5
        }}>
          <View style={{
            flexDirection: 'row',
            borderWidth: 2,
            borderRadius: 20,
            height: 50,
            alignItems: 'center'
          }}>
            <TouchableOpacity
              onPress={() => setShowSearchInput(!showSearchInput)}
              style={{
                backgroundColor: Color.primary,
                left: 5,
                height: 40,
                width: 40,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <MaterialIcons name='search' size={24} style={{ color: showSearchInput ? Color.icon : Color.border }} />
            </TouchableOpacity>
            <View style={{
              flexDirection: 'row', paddingHorizontal: 8
            }}>
              {showSearchInput && (
                <TextInput
                  style={styles.inputSearch}
                  value={searchSalesQuery}
                  placeholder='Search Sales'
                  onChangeText={setSearchSalesQuery}
                  onSubmitEditing={onSubmitEditing}
                />
              )}
            </View>
          </View>
        </View>
        {/* BODY */}
        <View style={{
          flexDirection: 'row', paddingBottom: 190,
        }}>
          {isLoading ? (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator size="large" color={Color.border} /> 
            </View>
          ): (
            <FlatList
            data = { searchSalesQuery? searchSalesData: salesData }
            showsHorizontalScrollIndicator = { false }
            contentContainerStyle = {{
              gap: 15
            }}
          renderItem={({ item, index }) => (
            <RenderItem item={item} index={index} />
          )}
          />
          )}
        </View>
        
      </View>
      <View style={styles.bodyCreate}>
        <TouchableOpacity
          onPress={onPress}
          style={styles.buttonCreate}
        >
          <MaterialIcons name="edit" size={24} color={Color.icon} />
        </TouchableOpacity>
      </View>
      <BottomSheet ref={ref}>
        <BottomSheetSales/>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default SalesPage

const styles = StyleSheet.create({
  inputSearch: {
    height: 40,
    width: 280,
    borderRadius: 5,
    marginRight: 10,
  },
  containerHeader: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bordersearch: {
    height: 52,
    width: 52,
    borderRadius: 52,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  garisheader: {
    borderRadius: 5,
    width: 350,
    borderBottomWidth: 5,
    backgroundColor: Color.border,
    position: 'absolute',
    bottom: 5
  },
  bodyCreate: {
    position: 'absolute',
    paddingVertical: 10,
    bottom: 0, // Fleksibel di berbagai perangkat
    left: 0,
    right: 0,
    paddingLeft: '83%',
    paddingBottom:'5%'
  },
  buttonCreate: {
    width: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 52,
    backgroundColor: Color.border,
  }
})