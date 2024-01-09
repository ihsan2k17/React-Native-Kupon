import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../../constant/color'
import DropdownInputKupon from '../dropdown/dropdownINkupon/dropdowninput'
import { FetchHadiahGetPeriode, FetchPoinHadiah } from '../../../service/fetchHadiah'
import { Hadiah } from '../../../models/hadiah'
import DropdownNamaHadiah from '../dropdown/dropdownnamahadiah'
import DropdownKupon from '../dropdown/dropdownKupon'
import { handleInputKupon } from '../../../service/fetchKupon'
import Modal from 'react-native-modal'
import SuccessInputKupon from './modalsuccessinput'
import ModalErrorInputKupon from './modalerrorinputkupon'
import { Jenis } from '../../constant/poin'
import { Poppins } from '../../constant/font'
import DropdownIDKupon from '../dropdown/dropdownIDKupon'

interface formInputKuponProps {
    id: number | undefined;
    setId: React.Dispatch<React.SetStateAction<number | undefined>>;
    poin: number | undefined;
    setPoin: React.Dispatch<React.SetStateAction<number | undefined>>;
    namahadiah: string;
    setNamahadiah: React.Dispatch<React.SetStateAction<string>>;
    kupon: number | undefined;
    setKupon: React.Dispatch<React.SetStateAction<number | undefined>>;
    tahun: number | undefined;
    setTahun: React.Dispatch<React.SetStateAction<number | undefined>>;
    hadiahke: number | undefined;
    setHadiahke: React.Dispatch<React.SetStateAction<number | undefined>>;
    hadiah: number | undefined;
    setHadiah: React.Dispatch<React.SetStateAction<number | undefined>>;
    periode: number | undefined;
    setPeriode: React.Dispatch<React.SetStateAction<number | undefined>>;
    jenis: string;
    setJenis: React.Dispatch<React.SetStateAction<string>>;
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    notificationModal: string;
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>;
    modalType: string;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
}

const FormInputKupon = ({
    id, setId,
    poin, setPoin,
    namahadiah, setNamahadiah,
    kupon, setKupon,
    tahun, setTahun,
    hadiahke, setHadiahke,
    hadiah, setHadiah,
    periode, setPeriode,
    jenis, setJenis,
    modal, setModal,
    notificationModal, setNotificationModal,
    modalType, setModalType
}:formInputKuponProps) => {
    const [listPoinHadiah, setListPoinHadiah] = useState<Hadiah[]>([])
    const [isPoinHadiahDropdownVisible, setPoinHadiahDropdownVisible] = useState(false);
    const [isJenisDropdownVisible, setJenisDropdownVisible] = useState(false);
    const [isPeriodeDropdownVisible, setPeriodeDropdownVisible] = useState(false);
    
    const toggledropdownPeriode = async () => {
        setPeriodeDropdownVisible(!isPeriodeDropdownVisible)
    }
    const toggledropdownjenis = async () => {
        setJenisDropdownVisible(!isJenisDropdownVisible)
    }
    const toggledropdownPoinHadiah = async () => {
        setPoinHadiahDropdownVisible(!isPoinHadiahDropdownVisible)
    }

    const handleDropdownOptionSelect = (selectedValue: string | number) => {
        if (typeof selectedValue === 'string') {
            if (isJenisDropdownVisible) {
                setJenis(selectedValue);
                toggledropdownjenis();   
            } 
        } else if (typeof selectedValue === 'number') {
            if (isPeriodeDropdownVisible) {
                setPeriode(selectedValue);
                toggledropdownPeriode();
            } else if (isPoinHadiahDropdownVisible) {
                setHadiah(selectedValue);
                toggledropdownPoinHadiah()
            }
        }
    };

    useEffect(() => {
        if (isPoinHadiahDropdownVisible) {
            FetchPoinHadiah(setListPoinHadiah, setNotificationModal, setModal)
        }
        if (isPeriodeDropdownVisible) {
            FetchHadiahGetPeriode(setListPoinHadiah,setNotificationModal, setModal)
        }

    }, [isPoinHadiahDropdownVisible, isPeriodeDropdownVisible]);



    return (
        <View style={{ backgroundColor: 'white', padding:15, borderRadius:20, gap:5 }}>
            <View style={{ flexDirection: 'row', justifyContent:'space-around', gap:10 }}>
                <View>
                    <DropdownIDKupon
                        id={id} setId={setId} setTahun={setTahun} setHadiah={setHadiah}
                        setNamahadiah={setNamahadiah} setPeriode={setPeriode} setJenis={setJenis}
                        setModal={setModal} setNotificationModal={setNotificationModal} setModalType={setModalType} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="control-point" size={24} color={Color.border} style={{ paddingRight: 5 }} />
                    <TextInput
                        placeholder="Poin *"
                        value={poin === 0 ? '' : undefined}
                        keyboardType='numeric'
                        onChangeText={(text) => setPoin(parseInt(text))}
                        style={{ height: 50, width: 100, borderBottomWidth: 1, fontSize:15, fontFamily:Poppins.SemiBold }}
                    />
                    <View style={{width:19}}></View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10 }}>
                <DropdownKupon kupon={kupon} setKupon={setKupon} submit={() => handleInputKupon(id,
                    kupon,
                    poin,
                    tahun,
                    hadiahke,
                    hadiah,
                    namahadiah,
                    periode,
                    jenis,
                    setModal,
                    setModalType,
                    setNotificationModal)}/>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="perm-contact-calendar" size={24} color={Color.border} style={{ paddingRight: 5 }} />
                    <TextInput
                        placeholder="Tahun *"
                        value={tahun !== undefined ? tahun.toString() : undefined}
                        keyboardType='numeric'
                        onChangeText={(text) => setTahun(parseInt(text))}
                        style={{ height: 50, width: 100, borderBottomWidth: 1, fontSize:15, fontFamily:Poppins.SemiBold }}
                    />
                    <View style={{width:19}}></View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10 }}>
                <DropdownInputKupon
                    isVisible={isPoinHadiahDropdownVisible}
                    setIsVisible={setPoinHadiahDropdownVisible}
                    onSelectOption={handleDropdownOptionSelect}
                    onClose={toggledropdownPoinHadiah}
                    options={listPoinHadiah.map(item => item.Poin_Hadiah)}
                    textInputValue={hadiah?.toString() !== undefined ? hadiah.toString() : ''}
                    settextInputValue={(value) => setHadiah(parseInt(value)||undefined)}
                    textInputPlaceHolder={'Hadiah *'}
                    materialIcon='card-travel'
                    keyboardType='numeric'
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="credit-card" size={24} color={Color.border} style={{ paddingRight: 5 }} />
                    <TextInput
                        placeholder="Hadiah Ke *"
                        value={hadiahke === 0 ? '' : undefined}
                        keyboardType='numeric'
                        onChangeText={(text) => setHadiahke(parseInt(text))}
                        style={{ height: 50, width: 100, borderBottomWidth: 1, fontSize:15, fontFamily:Poppins.SemiBold }}
                    />
                    <View style={{width:19}}></View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <DropdownNamaHadiah namahadiah={ namahadiah} setNamahadiah={setNamahadiah} hadiah={hadiah} setHadiah={setHadiah}/>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10 }}>
                <View>
                    <DropdownInputKupon
                        isVisible={isPeriodeDropdownVisible}
                        setIsVisible={setPeriodeDropdownVisible}
                        onSelectOption={handleDropdownOptionSelect}
                        onClose={toggledropdownPeriode}
                        options={listPoinHadiah.map(item => item.Periode)}
                        textInputValue={periode !== undefined ? periode.toString() : undefined}
                        settextInputValue={(value) => setPeriode(parseInt(value))}
                        textInputPlaceHolder={'Periode *'}
                        materialIcon='card-membership'
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <DropdownInputKupon
                        isVisible={isJenisDropdownVisible}
                        setIsVisible={setJenisDropdownVisible}
                        onSelectOption={handleDropdownOptionSelect}
                        onClose={toggledropdownjenis}
                        options={Jenis.map(item => item.label)}
                        textInputValue={jenis}
                        settextInputValue={(text) => setJenis(text)}
                        textInputPlaceHolder={'Jenis *'}
                        materialIcon='credit-card'
                        keyboardType='name-phone-pad'
                    />
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleInputKupon(id,
                    kupon,
                    poin,
                    tahun,
                    hadiahke,
                    hadiah,
                    namahadiah,
                    periode,
                    jenis,
                    setModal,
                    setModalType,
                    setNotificationModal)}
                style={{padding:10, backgroundColor:Color.primary, justifyContent:'center', alignItems:'center'}}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: Color.icon }}>Input</Text>
            </TouchableOpacity>
            <Modal isVisible={modal} statusBarTranslucent>
                {modalType === 'error-get-data-id' || 'error-input-kupon'? (
                    <ModalErrorInputKupon setModal={setModal} setModalType={setModalType} notificationModal={notificationModal} setKupon={setKupon}/>
                ):(
                        <SuccessInputKupon
                            setModal={setModal}
                            notificationModal={notificationModal}
                            setModalType={setModalType}
                            setKupon={setKupon}
                        />
                )}
            </Modal>
        </View>
    );
}

export default FormInputKupon