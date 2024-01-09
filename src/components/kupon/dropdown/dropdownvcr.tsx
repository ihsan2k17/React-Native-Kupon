import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../../constant/color'
import Modal from 'react-native-modal'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { Poppins } from '../../constant/font'

interface DropdownProps {
    voucher?: number | undefined;
    setVoucher: React.Dispatch<React.SetStateAction<number | undefined>>
}

const DropdownVoucher = ({ voucher, setVoucher }: DropdownProps) => {
    const [isKuponDopdownVisible, setKuponDropdownVisible] = useState(false);
    const [isScanning, setIsScanning] = useState(false);


    const toggleDropdown = () => {
        setKuponDropdownVisible(!isKuponDopdownVisible)
    }
    const onQrCodeRead = (data: BarCodeReadEvent) => {
        setVoucher(parseInt(data.data));
        toggleDropdown();
        setIsScanning(true);
    }
    const showNotif = () => {
        if (isScanning) {
            return (
                <Modal isVisible={true}>
                    <View style={{
                        padding: 20,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                    }}>
                        <Text style={{ fontSize: 18 }}>
                            Kupon Berhasil Di-scan
                        </Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>
                            Kupon: {voucher}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setIsScanning(false)
                        }} style={{
                            padding: 10,
                            backgroundColor: Color.primary,
                            marginTop: 20,
                        }}>
                            <Text style={{ color: 'white' }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )
        }
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="request-page" size={24} color={Color.border} style={{ paddingRight: 5 }} />
            <TextInput
                placeholder="Voucher *"
                value={voucher ? voucher.toString() : ''}
                keyboardType='numeric'
                onChangeText={(text) => setVoucher(parseInt(text))}
                style={{ height: 50, width: 100, borderBottomWidth: 1, fontSize:15, fontFamily:Poppins.SemiBold }}
            />
            <TouchableOpacity onPress={toggleDropdown}>
                <MaterialIcons name='qr-code-scanner' size={18} color={Color.border} />
            </TouchableOpacity>
            <Modal isVisible={isKuponDopdownVisible}>
                <View style={{
                    flexDirection: 'column',
                    height: 500,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: Color.icon
                }}>
                    <QRCodeScanner
                        onRead={onQrCodeRead}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        showMarker={true}
                        cameraStyle={{ width: 300 }}
                        cameraContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                    <TouchableOpacity onPress={() => {
                        setKuponDropdownVisible(!isKuponDopdownVisible)
                    }} style={{
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: Color.primary
                    }}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {isScanning && showNotif()}
        </View>
    )
}

export default DropdownVoucher