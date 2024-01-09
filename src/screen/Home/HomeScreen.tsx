import { ScrollView, StatusBar, Text, View, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Category from './category';
import Header from '../../components/header/header';
import Color from '../../components/constant/color';
import { Login } from '../../models/login';
import { Poppins } from '../../components/constant/font';
import Modal from 'react-native-modal';
import ModalExit from '../../components/modalexit';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [profileData, setProfileData] = useState<Login | null>(null);
  const [alert, setAlert] = useState('');
  const [modalExit, setModalExit] = useState(false)
  const isLoading = !profileData || profileData.Username === '';
  const navigation = useNavigation();
  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setModalExit(true);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [modalExit])
  );

  
  return (
    <ScrollView style={{ backgroundColor: Color.icon }}>
      <StatusBar backgroundColor={Color.icon} />
      <SafeAreaView style={{ paddingVertical: 20, gap: 18 }}>
        {/* bagian header */}
        <Header
          profileData={profileData}
          setAlert={setAlert}
          setProfileData={setProfileData}
          alert={alert}
          button={() => { }}
          nameIcon={'notifications'}
        />
        {/* bagian koleksi */}
        <View style={{ paddingHorizontal: 20 }}>
          {/* judul */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 20, fontFamily:Poppins.Black, color: Color.text }}>
              Menu App
            </Text>
            <TouchableOpacity>
              <Text> Semua </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}></View>
        </View>
        {/* bagian kategori 2 */}
        {isLoading ? (
          <View>
            <Text>{alert}</Text>
          </View>
        ): (
            <>
              <Category />
              <View style={{ height: 30 }} />
            </>
        )}
        <Modal isVisible={modalExit} backdropColor={Color.text} backdropOpacity={0.8}>
          <ModalExit setModalExit={setModalExit} setString={setAlert} />
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
