import { View, Text, TouchableOpacity, StatusBar, Image, StyleSheet, ScrollView, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RouteProp, useNavigation } from '@react-navigation/native'
import Color from '../../../components/constant/color'
import Modal from 'react-native-modal'
import ModalInput from '../../../components/kupon/inputkupon/modalinputkupon'
import FormAddDataCustomer from '../../../components/customer/addcustomer/formaddcustomer'
import { Poppins } from '../../../components/constant/font'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AddDataCustomer, handleRefreshCurrent } from '../../../service/fetchCustomer'
import { RootStackParamList } from '../../../navigator/rootstack'
import { Customer } from '../../../models/customer'
import {renderErrorModal, renderSuccessModal } from '../../../components/customer/modalcustomer/rendermodaladdcustomer'
import ListCurrentCustomer from './listcurrentcustomer'

type DetailCustomerProps = {
    route: RouteProp<RootStackParamList, 'DetailCustomerPage'>;
}

const AddCustomer = () => {
    const navigation = useNavigation();
    const [customerData, setCustomerData] = useState<Customer[]>([])
    const [modal, setModal] = useState(false);
    const [modalInput, setModalInput] = useState(false);
    const [IDCust, setIDCust] = useState<number>();
    const [customer, setCustomer] = useState('');
    const [namaCustomer, setNamaCustomer] = useState('');
    const [alamat, setAlamat] = useState('');
    const [hp, setHp] = useState('');
    const [wa, setWa] = useState('');
    const [email, setEmail] = useState('');
    const [idAgen, setIdAgen] = useState<string>('');
    const [salesId, setSalesId] = useState('');
    const [kota, setKota] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [jenis, setJenis] = useState('');
    const [notificationModal, setNotificationModal] = useState('');
    const [modalType, setModalType] = useState('');
    const [refresh, setRefresh] = useState(false)
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
            extrapolate:'clamp'
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
        <SafeAreaView style={{backgroundColor:Color.icon, flex:1, padding:10, gap:10}}>
            <StatusBar backgroundColor={Color.icon} />
            { /* HEADER */}
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                {/* TOMBOL KEMBALI */}
                <View>
                    <TouchableOpacity style={styles.TouchableBack}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                    </TouchableOpacity>
                </View>
                {/* TOMBOL REFRESH */}
                <View>
                    <TouchableOpacity
                        style={styles.TouchableBack}
                        onPress={() => handleRefreshCurrent(
                            setRefresh, refreshAnimation, refreshRotation,
                            setRefreshRotation, setCustomerData, setNotificationModal,
                            setModal, setModalType
                        )} activeOpacity={1}>
                        <Animated.View
                            style={{
                                alignItems: 'center', justifyContent: 'center',
                                transform: [
                                    {
                                        rotate: refreshRotation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '360deg'],
                                        }),
                                    },
                                ],
                            }}>
                            <MaterialIcons name='autorenew' size={24} color={Color.icon} />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
            {dynamicHeader({value:scrollOffsetY})}
            <ScrollView
                scrollEventThrottle={5}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    {
                    useNativeDriver:false
                })}
            >
                {/* BODY */}
                <View>
                    <FormAddDataCustomer
                        IDCust={IDCust} setIDCust={setIDCust}
                        customer={customer} setCustomer={setCustomer}
                        namaCustomer={namaCustomer} setNamaCustomer={setNamaCustomer}
                        alamat={alamat} setAlamat={setAlamat}
                        hp={hp} setHp={setHp}
                        wa={wa} setWa={setWa}
                        email={email} setEmail={setEmail}
                        idAgen={idAgen} setIdAgen={setIdAgen}
                        salesId={salesId} setSalesId={setSalesId}
                        kota={kota} setKota={setKota}
                        keterangan={keterangan} setKeterangan={setKeterangan}
                        jenis={jenis} setJenis={setJenis}
                        notificationModal={notificationModal} setNotificationModal={setNotificationModal}
                        modal={modal} setModal={setModal}
                        modalType={modalType} setModalType={setModalType}
                    />
                </View>
                {/* FOOTER */}
                <View style={{ alignItems: 'center', paddingVertical:10 }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, gap: 20 }}>
                        <View>
                            <TouchableOpacity style={{ backgroundColor: Color.border, padding: 10, flexDirection:'row', borderRadius:10 }}
                                onPress={() => { setModalInput(!modalInput) }}
                            >
                                <MaterialIcons name='add' size={24} color={Color.icon}/>
                                <Text style={{fontFamily:Poppins.SemiBold, color:Color.icon}}>Input Data</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={{ backgroundColor: Color.primary, padding: 10,borderRadius:10 }}
                                onPress={() => {
                                    if (IDCust !== undefined) {
                                        AddDataCustomer(
                                            IDCust, customer, namaCustomer, alamat, hp, wa, email, idAgen, salesId,
                                            kota, jenis, keterangan, setModal, setNotificationModal, setModalType
                                        );
                                    } else {
                                        console.log(IDCust)
                                    }
                                }}
                            >
                                <Text style={{fontFamily:Poppins.SemiBold, color:Color.icon}}>Add Customer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ListCurrentCustomer
                    customerData={customerData} setCustomerData={setCustomerData}
                    setNotificationModal={setNotificationModal} setModalType={setModalType}
                    setModal={setModal}refreshAnimation={refreshAnimation}
                    refresh={refresh} />
            </ScrollView>
            <Modal isVisible={modalInput}>
                <ModalInput setModal={setModalInput}/>
            </Modal>
            <Modal isVisible={modal}>
                {modalType === 'success-add-customer' && renderSuccessModal({setModal, setModalType, notificationModal})}
                {modalType === 'error-add-customer' && renderErrorModal({setModal, setModalType, notificationModal})}
                {modalType === 'current-list-error' && renderErrorModal({setModal, setModalType, notificationModal})}
            </Modal>
        </SafeAreaView>
    )
}

export default AddCustomer;
const styles = StyleSheet.create({
    divContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        backgroundColor: Color.icon
    },
    textNotif: {
        fontFamily: Poppins.SemiBold,
        fontSize: 15,
        textAlign: 'center'
    },
    buttonClose: {
        padding: 10,
        justifyContent: 'center',
        backgroundColor: Color.primary,
        alignItems: 'center',
        borderRadius: 25
    },
    TouchableBack: {
        backgroundColor: Color.border,
        borderRadius: 15,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})