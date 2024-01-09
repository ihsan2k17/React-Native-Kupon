import { View, StatusBar, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Color from '../../components/constant/color'
import Header from '../../components/header/header'
import { Login } from '../../models/login'
import { fetchallUser } from '../../service/fetchLogin'
import Modal from 'react-native-modal'
import ModalLogout from '../../components/profile/modal/modalLogout'
import { Poppins } from '../../components/constant/font'
import RenderProfile from './renderprofile'
import { useNavigation } from '@react-navigation/native'


const Profile = () => {
    const navigation = useNavigation()
    const [alert, setAlert] = useState('');
    const [profileData, setProfileData] = useState<Login | null>(null);
    const [userData, setUserData] = useState<Login[] | null>(null);
    const [modalLogout, setModalLogout] = useState(false);
    
    const isLoading = !userData || userData.length === 0
    

    useEffect(() => {
        fetchallUser(setUserData, setAlert)
    }, []);

    return (
        <View style={{
            flex:1,
            backgroundColor: Color.icon
        }}>
            <SafeAreaView style={{
                paddingVertical: 20, gap: 18
            }}>
                <StatusBar backgroundColor={Color.icon} />
                {/*<Header />*/}
                <Header
                    profileData={profileData}
                    setProfileData={setProfileData}
                    setAlert={setAlert}
                    alert={alert}
                    button={() => {
                        setModalLogout(true)
                    }}
                    nameIcon={'logout'}
                />
            </SafeAreaView>
            <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 80 }}>
                <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10, borderRadius: 10 }}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: Poppins.Bold, color: Color.border }}>List User Online dan Offline</Text>
                    </View>
                    {isLoading ? (
                        <View>
                            <Text>{alert}</Text>
                        </View>) : (
                        <FlatList
                            data = { userData }
                            showsHorizontalScrollIndicator = { false }
                            maxToRenderPerBatch = { 5 }
                            windowSize = { 10 }
                            contentContainerStyle = {{
                                paddingHorizontal: 10,
                                gap: 10,
                                paddingBottom: 10
                            }}
                        renderItem={({ item, index }) => (
                        <RenderProfile item={item} index={index}/>
                            )}
                        />
                    )}
                </View>
            </View>
            <Modal isVisible={modalLogout}>
                <ModalLogout setModalLogout={setModalLogout} />
            </Modal>
        </View>
    )
}
export default Profile;
const styles = StyleSheet.create({

})