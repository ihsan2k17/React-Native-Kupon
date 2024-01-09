import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../constant/color';
import { SelectTopIdCustomer } from '../../../service/fetchCustomer';
import { Customer } from '../../../models/customer';
import Modal from 'react-native-modal'
import ModalSelectIdCustomer from '../modalcustomer/modalselecttopidcustomer';
import DropdownListCustomer from '../dropdown/dropdownliscust';
import { Poppins } from '../../constant/font';
import DropdownListSales from '../dropdown/dropdownlissales';
import DropdownCustomerJenis from '../dropdown/dropdownjenis';
import DropdownListAgenCust from '../dropdown/dropdownlisagen';


interface props {
    IDCust: number|undefined;
    setIDCust: React.Dispatch<React.SetStateAction<number|undefined>>;
    customer: string;
    setCustomer: React.Dispatch<React.SetStateAction<string>>;
    namaCustomer: string;
    setNamaCustomer: React.Dispatch<React.SetStateAction<string>>;
    alamat: string;
    setAlamat: React.Dispatch<React.SetStateAction<string>>;
    hp: string;
    setHp: React.Dispatch<React.SetStateAction<string>>;
    wa: string;
    setWa: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    idAgen: string;
    setIdAgen: React.Dispatch<React.SetStateAction<string>>;
    salesId: string;
    setSalesId: React.Dispatch<React.SetStateAction<string>>;
    kota: string;
    setKota: React.Dispatch<React.SetStateAction<string>>;
    keterangan: string;
    setKeterangan: React.Dispatch<React.SetStateAction<string>>;
    jenis: string;
    setJenis: React.Dispatch<React.SetStateAction<string>>;
    notificationModal: string;
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>;
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    modalType: string;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
}

const FormAddDataCustomer = ({
    IDCust, setIDCust, customer, setCustomer, namaCustomer, setNamaCustomer, alamat, setAlamat,
    hp, setHp, wa, setWa, email, setEmail, idAgen, setIdAgen, salesId, setSalesId, kota, setKota,
    keterangan, setKeterangan, jenis, setJenis, notificationModal, setNotificationModal,
    modal, setModal, modalType, setModalType
}:props) => {
    
    const [id, setID] = useState<Customer[]>([]);

    useEffect(() => {
        
    },[])
    const handleSelectTopIdCustomer = async () => {
        const data = await SelectTopIdCustomer(setID, setNotificationModal, setModal, setModalType);
        if (data.length > 0) {
            setIDCust(data[0].ID); // Mengatur IDCust ke ID pertama dalam data
        }
    };

    
    return (
        <View style={{ paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 10 }}>
            <View style={{paddingVertical:10}}>
                <Text style={{
                    fontFamily:Poppins.Black, fontSize:25, textAlign:'center', color:Color.border
                }}>FORM NEW CUSTOMER</Text>
            </View>
            <View style={{flexDirection:'row', gap:10}}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                    <MaterialIcons name='person-pin' size={24} color={Color.border} />
                    <TextInput
                        placeholder=" ID *"
                        value={IDCust !== undefined ? IDCust.toString() : ''}
                        keyboardType='number-pad'
                        onChangeText={(text) => setIDCust(parseInt(text))}
                        style={{ height: 40, flex:1, borderBottomWidth: 1 }}
                    />
                    <TouchableOpacity
                        onPress={handleSelectTopIdCustomer}
                    >
                        <MaterialIcons
                            name='arrow-forward-ios'
                            size={18}
                            color={Color.border}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex:2, justifyContent: 'space-around', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialIcons name={'wallet-giftcard'} size={24} color={Color.border} style={{ paddingRight: 5 }} />
                        <TextInput
                            placeholder="Customer *"
                            value={customer}
                            keyboardType='name-phone-pad'
                            onChangeText={(text) => setCustomer(text)}
                            style={{ flex: 1, height: 40, borderBottomWidth: 1 }}
                        />
                    </View>
                    {/*<DropdownListCustomerNakami
                        customer={customer} setCustomer={setCustomer} setIdAgen={setIdAgen} setSalesId={setSalesId} setKota={setKota}/>*/}
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', gap:10}}>
                <View style={{flex:1, justifyContent:'space-around'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialIcons name='supervised-user-circle' size={24} color={Color.border} />
                        <TextInput
                            placeholder="Nama Customer *"
                            value={namaCustomer}
                            keyboardType='name-phone-pad'
                            onChangeText={(text) => setNamaCustomer(text)}
                            style={{ flex: 1, height: 40, borderBottomWidth: 1 }}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10 }}>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{flexDirection:'row', alignItems:'flex-end', paddingVertical:10}}>
                        <MaterialIcons name='location-pin' size={24} color={Color.border} style={{paddingVertical:5}} />
                        <TextInput
                            placeholder=" Alamat *"
                            value={alamat}
                            multiline={true}
                            numberOfLines={3}
                            keyboardType='name-phone-pad'
                            onChangeText={(text) => setAlamat(text)}
                            style={{ height: 80,flex:1, borderBottomWidth: 1 }}
                        />
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', gap:10}}>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <MaterialIcons name='local-phone' size={24} color={Color.border} />
                        <TextInput
                            placeholder=" No Handphone"
                            value={hp !== undefined ? hp.toString() : ''}
                            keyboardType='number-pad'
                            onChangeText={(text) => setHp(text)}
                            style={{ height: 40, flex:1, borderBottomWidth: 1 }}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <MaterialIcons name='phonelink-ring' size={24} color={Color.border} />
                        <TextInput
                            placeholder="WhatsApp"
                            value={wa !== undefined ? wa.toString() : ''}
                            keyboardType='number-pad'
                            onChangeText={(text) => setWa(text)}
                            style={{ height: 40, flex: 1, borderBottomWidth: 1 }}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10 }}>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <MaterialIcons name='attach-email' size={24} color={Color.border} />
                        <TextInput
                            placeholder="Email"
                            value={email !== undefined ? email.toString() : ''}
                            keyboardType='name-phone-pad'
                            onChangeText={(text) => setEmail(text)}
                            style={{ height: 40, flex: 1, borderBottomWidth: 1 }}
                        />
                    </View>
                </View>
                <View style={{flex:1, justifyContent:'space-around'}}>
                    <DropdownListAgenCust idAgen={idAgen} setIdAgen={setIdAgen} setSalesId={setSalesId} />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10 }}>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <DropdownListSales salesId={salesId} setSalesId={setSalesId} />
                </View>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <MaterialIcons name='location-city' size={24} color={Color.border} />
                        <TextInput
                            placeholder="Kota "
                            value={kota !== undefined ? kota.toString() : ''}
                            keyboardType='name-phone-pad'
                            onChangeText={(text) => setKota(text)}
                            style={{ height: 40, flex: 1, borderBottomWidth: 1 }}
                        />
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', gap:10}}>
                <View style={{flex:1, justifyContent:'space-around'}}>
                    <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10}}>
                        <DropdownCustomerJenis jenis={jenis} setJenis={setJenis} />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <MaterialIcons name='info-outline' size={24} color={Color.border} />
                        <TextInput
                            placeholder="Keterangan "
                            value={keterangan !== undefined ? keterangan.toString() : '-'}
                            keyboardType='name-phone-pad'
                            onChangeText={(text) => setKeterangan(text)}
                            style={{ height: 40, flex: 1, borderBottomWidth: 1 }}
                        />
                    </View>
                </View>
            </View>
            {modal && (
                <Modal isVisible={modal}>
                    {modalType === 'error-select-top-customer-id' && (
                        <ModalSelectIdCustomer modal={modal} setModal={setModal} notificationModal={notificationModal} />
                    )}
                    {modalType === ''}
                </Modal>
            )}
        </View>
    )
}

export default FormAddDataCustomer
