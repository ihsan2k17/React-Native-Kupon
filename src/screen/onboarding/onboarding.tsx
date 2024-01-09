import { ActivityIndicator, Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Color from '../../components/constant/color'
import { Poppins } from '../../components/constant/font'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import { fetchLastLogin } from '../../service/fetchLogin'

const Onboarding = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notification, setNotification] = useState('')
    const [device, setDevice] = useState(``)
    const [version, setVersion] = useState('')
    
    useEffect(() => {
        const fetchDeviceInfo = async () => {
            const devip = await DeviceInfo.getBrand()
            const devname = await DeviceInfo.getDeviceName()
            const devversion = await DeviceInfo.getSystemVersion();
            const devandro = await DeviceInfo.getSystemName();
            const devapi = await DeviceInfo.getApiLevel();
            setVersion(`${devandro} ${devversion} - Api ${devapi}`);
            setDevice(`${devip} ${devname}`);
        }
        fetchDeviceInfo()
    }, [])
    
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                setIsLoading(true)
                const userLoggedIn = await AsyncStorage.getItem('token');
                setIsLoggedIn(!!userLoggedIn);
            } catch (error) {
                console.error('Gagal membaca informasi status login:', error);
            } finally {
                setIsLoading(false)
            }
        };
        setTimeout(() => {
            checkLoginStatus();
        }, 1500);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (isLoggedIn) {
                const fetchDeviceInfo = async () => {
                    await fetchLastLogin(device, version, setNotification)
                }
                fetchDeviceInfo()
                navigation.navigate('TabStack' as never);
            } else {
                navigation.navigate('LoginScreen' as never);
            }
        }
    }, [isLoading, isLoggedIn, navigation]);

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Color.primary, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar translucent backgroundColor={'transparent'} />
            <Image
                source={require('../../assets/images/imagebgonboaridng.jpeg.jpg')}
                resizeMode='contain'
                style={{opacity:0.5, position:'absolute', top:0, bottom:0, right:0, left:0}}
            />
            <View>
                <Image source={require('../../assets/icons/Logo_Naiba.png')}
                    resizeMode='contain'
                    style={{ height: 240, width: 240, marginBottom: -50 }}
                />
                <Image source={require('../../assets/icons/Logo_Nakami.png')}
                    resizeMode='contain'
                    style={{ width: 240, marginTop: -60 }}
                />
            </View>
            {isLoading ? (
                <>
                    <ActivityIndicator size="large" color={Color.icon} style={styles.loadingIndicator} />
                </>
            ) : (
                <>
                    <Text style={{ fontSize: 20, fontFamily: Poppins.Bold, color: Color.icon, textAlign: 'center' }}>Coba Cek Jaringan nya</Text>
                </>
            )}
            <View style={{ bottom: 0, right: 0, left: 0, position: 'absolute' }}>
                <Text style={{ textAlign: "center", fontFamily: Poppins.SemiBold, }}>{notification}</Text>
                <Text style={{ textAlign: 'center', fontFamily: Poppins.SemiBold, }}>
                    App Kupon Naiba dan Nakami
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    loadingIndicator: {
        marginTop: 20,
    },
})