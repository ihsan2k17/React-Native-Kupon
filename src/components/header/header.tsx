import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../constant/color'
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Login } from '../../models/login';
import { fetchProfileData } from '../../service/fetchLogin';
import { Poppins } from '../constant/font';

const Avatar =
    `https://images.unsplash.com/photo-1634034379073-f689b460a3fc?ixlib=rb-4.0.
  3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=
  format&fit=crop&w=880&q=80`
interface props {
    profileData: Login|null,
    setProfileData: React.Dispatch<React.SetStateAction<Login | null>>,
    alert: string;
    setAlert: React.Dispatch<React.SetStateAction<string>>;
    button: () => void;
    nameIcon: string
}

const HeaderProfile = ({profileData,setAlert, setProfileData, alert, button, nameIcon}:props) => {
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchProfileData(setProfileData, setLoading, setAlert);
            } catch (error) {
                throw error;
            }
        };
        fetchData();
    });
    return (
        <View style={stylesHeader.containerProfile}>
            <Image
                source={{uri: Avatar}}
                style={{width: 52,aspectRatio: 1,borderRadius: 52}}
                resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
                {Loading ? (
                    <Text style={stylesHeader.TextName}
                        numberOfLines={1}
                    >User Misterius</Text>
                ): (
                    <Text style={stylesHeader.TextName}
                    numberOfLines={1}
                >Hi, {profileData?.Username}</Text>
                )}
                {Loading ? (
                    <Text style={{color: Color.text, opacity: 0.5
                    }} numberOfLines={1}>Tidak Ada Status</Text>
                ): (
                    <Text style={stylesHeader.TextStatus} numberOfLines={1}>Status, {profileData?.Role }</Text>
                )}
                {Loading ? (
                    <View>
                        <Text style={{color: Color.text, opacity: 0.5}}>{alert}</Text>
                    </View>) : (<View></View>)}
            </View>

            <TouchableOpacity
                style={stylesHeader.containerNotifications}
                onPress={button}
            >
                <Icons name={nameIcon} size={24} color={Color.border} />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderProfile

const stylesHeader = StyleSheet.create({
    containerProfile: {
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    containerNotifications: {
        width: 52,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 52,
        borderWidth: 1,
        borderColor: Color.border
    },
    TextName: {
        fontSize: 18,
        fontFamily:Poppins.Black,
        color: Color.border
    },
    TextStatus: {
        color: Color.border, opacity: 0.8,
        fontFamily:Poppins.SemiBold
    }
})