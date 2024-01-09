import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../../constant/color'

interface props {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    notificationModal: string
}

const windowWidth = Dimensions.get('window').width;

const SuccessInputVoucher = ({ setModal, notificationModal }: props) => {
    const handlesetModal = () => {
        setModal(false)
    }

    return (
        <View style={styles.Container}>
            <View style={styles.ContainerImage}>
                <Image source={require('../../../assets/icons/suksesinputkuponvoucher.png')} style={{
                    height: windowWidth * 0.3, // Menggunakan persentase dari lebar layar
                    width: windowWidth * 0.24, // Menggunakan persentase dari lebar layar   
                }} />
            </View>
            <View style={styles.Container1}>
                <View style={styles.Container2}>
                    <Text style={{ fontSize: windowWidth * 0.04, fontWeight: '400' }}>{notificationModal}</Text>
                    <TouchableOpacity onPress={handlesetModal} style={styles.touchableContainer}>
                        <Text style={{ fontSize: windowWidth * 0.04, fontWeight: '500' }}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SuccessInputVoucher

const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        position: 'relative'
    },
    ContainerImage: {
        position: 'absolute',
        bottom: -windowWidth * 0.04, // Menggunakan persentase dari lebar layar
        zIndex: 2,
    },
    Container1: {
        backgroundColor: Color.icon,
        position: 'absolute',
        top: -windowWidth * 0.04, // Menggunakan persentase dari lebar layar
        height: windowWidth * 0.34, // Menggunakan persentase dari lebar layar
        width: windowWidth * 0.70, // Menggunakan persentase dari lebar layar
        padding: windowWidth * 0.04, // Menggunakan persentase dari lebar layar
        alignItems: 'center',
        borderRadius: windowWidth * 0.05, // Menggunakan persentase dari lebar layar
    },
    Container2: {
        position: 'absolute',
        padding: windowWidth * 0.02, // Menggunakan persentase dari lebar layar
        gap: windowWidth * 0.02, // Menggunakan persentase dari lebar layar
        bottom: 0,
        alignItems: 'center',
    },
    touchableContainer: {
        backgroundColor: Color.background,
        paddingVertical: windowWidth * 0.02, // Menggunakan persentase dari lebar layar
        alignItems: 'center',
        paddingHorizontal: windowWidth * 0.04, // Menggunakan persentase dari lebar layar
        borderRadius: windowWidth * 0.02, // Menggunakan persentase dari lebar layar
    }
})