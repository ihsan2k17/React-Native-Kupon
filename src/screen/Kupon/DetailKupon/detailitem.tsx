import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Color from '../../../components/constant/color';
import Modal from 'react-native-modal';
import { Poppins } from '../../../components/constant/font';
import { Kupon } from '../../../models/kupon';
import ModalEditDeleteKupon from '../../../components/kupon/modaleditdeletekupon';

interface DetailItemProps {
    item: Kupon
    index: number;
    selectedPointerIndex: number;
    setSelectedPointerIndex: (index: number) => void;
}

const DetailsItem = ({ item, index, selectedPointerIndex, setSelectedPointerIndex }: DetailItemProps) => {
    const showKupon = item.Voucher === 0 || item.Kupon === null;
    const isSelected = index === selectedPointerIndex;
    const colors = [Color.primary, Color.secondary, Color.blue1Primary, Color.blue3Secondary];
    const colorindeks = index % colors.length;
    const colorindeksVoucher = index % colors.length;
    const [showVisibleModal, setShowVisibleModal] = useState(false);
    

    return (
        <View style={{ flex:1,paddingHorizontal: 10, alignItems:'center', borderRadius:20, paddingTop:10 }}>
            <TouchableOpacity
                activeOpacity={1}
                style={[
                    style.CardTouchable1,
                    {
                        backgroundColor: isSelected
                            ? 'white'
                            : colors[showKupon ? colorindeks : colorindeksVoucher]
                    },
                ]}
                onLongPress={() => {
                    setShowVisibleModal(true);
                }}>
                <ImageBackground
                    source={require('../../../assets/images/bg_flat.jpg')}
                    imageStyle={style.cardImageContainer}
                >
                    <View style={{ flexDirection: 'column', padding:10 }}>
                        <View style={{ alignItems: 'center' }}>
                            {showKupon ? <Image source={require('../../../assets/images/voucherr.png')} style={{ height: 60, width: 120 }} /> :
                            <Image source={require('../../../assets/images/coupon.png')} style={{ height: 60, width: 120 }} />}
                        </View>
                        <View>
                            {showKupon ?
                                <Text style={style.textCoupoinorVoucher}>Voucher: {item.Voucher}</Text>
                                : <Text style={style.textCoupoinorVoucher}>Kupon: {item.Kupon}</Text>}
                            <Text style={style.textinputby}>Input By: {item.User_Input}</Text>
                        </View>
                    </View>
                </ImageBackground>
                
            </TouchableOpacity>
            <Modal
                isVisible={showVisibleModal}
                customBackdrop={<View style={{ flex: 1, backgroundColor: Color.border }} />}
                statusBarTranslucent
                backdropTransitionOutTiming={0}
                animationIn='fadeInUp'
                backdropOpacity={0.5}
            >
                <ModalEditDeleteKupon setShowVisibleModal={setShowVisibleModal} item={item}/>
            </Modal>
        </View>
    );
}

export default DetailsItem;

const style = StyleSheet.create({
    CardTouchable1: {
        width: '100%',
        borderRadius:20
    },
    cardImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', // Sesuaikan tinggi gambar latar belakang dengan kebutuhan Anda
        borderRadius: 20,
        opacity: 0.6,
    },
    textCoupoinorVoucher: {
        fontSize: 15,
        fontFamily:Poppins.ExtraBold
    },
    textinputby: {
        fontSize: 14,
        fontFamily:Poppins.SemiBold
    }
})