import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../../constant/color'
import { handleInputVoucher } from '../../../service/fetchKupon'
import Modal from 'react-native-modal'
import SuccessInputVoucher from './modalsuccessinputvcrnkm'
import DropdownInputVoucher from '../dropdown/dropdownINvoucher/dropdowninputvcr,'
import DropdownVoucher from '../dropdown/dropdownvcrnkm'
import DropdownNamaHadiah from '../dropdown/dropdownnamahadiahnkm'
import ModalErrorInputKupon from '../inputkupon/modalerrorinputkupon'
import { Jenis } from '../../constant/poin'
import { CustomerNkm } from '../../../models/customerNakami'
import { HadiahNKM } from '../../../models/hadiahNakami'
import { fetchTahunHadiahNamaHadiahPeriodeJenisbyIDKuponNakami } from '../../../service/fetchKuponNakami'
import { FetchCustomerNKMListId } from '../../../service/fetchCustomerNakami'
import { FetchHadiahGetPeriodeNKM, FetchPoinHadiahNKM } from '../../../service/fetchHadiahNakami'
import DropdownIDKuponNKM from '../dropdown/dropdownIDKuponnkm'

interface formInputVoucherProps {
    id: number | undefined;
    setId: React.Dispatch<React.SetStateAction<number | undefined>>;
    poin: number | undefined;
    setPoin: React.Dispatch<React.SetStateAction<number | undefined>>;
    namahadiah: string;
    setNamahadiah: React.Dispatch<React.SetStateAction<string>>;
    voucher: number | undefined;
    setVoucher: React.Dispatch<React.SetStateAction<number | undefined>>;
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

const FormInputVoucherNakami = ({
    id, setId,
    poin, setPoin,
    namahadiah, setNamahadiah,
    voucher, setVoucher,
    tahun, setTahun,
    hadiahke, setHadiahke,
    hadiah, setHadiah,
    periode, setPeriode,
    jenis, setJenis,
    modal, setModal,
    notificationModal, setNotificationModal,
    modalType, setModalType
}:formInputVoucherProps) => {
    const [listID, setListID] = useState<CustomerNkm[]>([]);
    const [listPoinHadiah, setListPoinHadiah] = useState<HadiahNKM[]>([])
    const [isIdDropdownVisible, setIdDropdownVisible] = useState(false);
    const [isPoinHadiahDropdownVisible, setPoinHadiahDropdownVisible] = useState(false);
    const [isJenisDropdownVisible, setJenisDropdownVisible] = useState(false);
    const [isPeriodeDropdownVisible, setPeriodeDropdownVisible] = useState(false);

    const toggledropdownId = async () => {
        setIdDropdownVisible(!isIdDropdownVisible)
    }
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
            } else if (isIdDropdownVisible) {
                if (setId.length !== 0) {
                    setId(selectedValue)
                    fetchTahunHadiahNamaHadiahPeriodeJenisbyIDKuponNakami(
                        id, setTahun, setHadiah, setNamahadiah, setPeriode, setJenis,
                        setModal, setModalType, setNotificationModal)
                } else {
                    setId(selectedValue);
                }
            } else if (isPoinHadiahDropdownVisible) {
                setHadiah(selectedValue);
                toggledropdownPoinHadiah()
            }
        }
    };

    useEffect(() => {
        if (isIdDropdownVisible) {
            FetchCustomerNKMListId(setListID, setNotificationModal, setModal)
        }
        if (isPoinHadiahDropdownVisible) {
            FetchPoinHadiahNKM(setListPoinHadiah, setNotificationModal, setModal)
        }
        if (isPeriodeDropdownVisible) {
            FetchHadiahGetPeriodeNKM(setListPoinHadiah, setNotificationModal, setModal)
        }

    }, [isIdDropdownVisible, isPoinHadiahDropdownVisible, isPeriodeDropdownVisible]);
    useEffect(() => {
        if (id !== undefined) {
            fetchTahunHadiahNamaHadiahPeriodeJenisbyIDKuponNakami(
                id, setTahun, setHadiah, setNamahadiah, setPeriode, setJenis,
                setModal, setModalType, setNotificationModal
            );
        }
    }, [id]);
    return (
        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 20, gap: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10 }}>
                <View>
                    <DropdownIDKuponNKM
                        id={id} setId={setId} setTahun={setTahun} setHadiah={setHadiah} setNamahadiah={setNamahadiah}
                        setPeriode={setPeriode} setJenis={setJenis} setModal={setModal}
                        setNotificationModal={setNotificationModal} setModalType={setModalType} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="control-point" size={24} color={Color.border} style={{ paddingRight: 5 }} />
                    <TextInput
                        placeholder="Poin *"
                        value={poin === 0 ? '' : undefined}
                        keyboardType='numeric'
                        onChangeText={(text) => setPoin(parseInt(text))}
                        style={{ height: 40, width: 100, borderBottomWidth: 1 }}
                    />
                    <View style={{ width: 19 }}></View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10 }}>
                <DropdownVoucher voucher={voucher} setVoucher={setVoucher} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="perm-contact-calendar" size={24} color={Color.border} style={{ paddingRight: 5 }} />
                    <TextInput
                        placeholder="Tahun *"
                        value={tahun !== undefined ? tahun.toString() : undefined}
                        keyboardType='numeric'
                        onChangeText={(text) => setTahun(parseInt(text))}
                        style={{ height: 40, width: 100, borderBottomWidth: 1 }}
                    />
                    <View style={{ width: 19 }}></View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10 }}>
                <DropdownInputVoucher
                    isVisible={isPoinHadiahDropdownVisible}
                    setIsVisible={setPoinHadiahDropdownVisible}
                    onSelectOption={handleDropdownOptionSelect}
                    onClose={toggledropdownPoinHadiah}
                    options={listPoinHadiah.map(item => item.Poin_Hadiah)}
                    textInputValue={hadiah !== undefined ? hadiah.toString() : undefined}
                    settextInputValue={(value) => setHadiah(parseInt(value))}
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
                        style={{ height: 40, width: 100, borderBottomWidth: 1 }}
                    />
                    <View style={{ width: 19 }}></View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <DropdownNamaHadiah
                        namahadiah={namahadiah} setNamahadiah={setNamahadiah} hadiah={hadiah} setHadiah={setHadiah}/>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10 }}>
                <View>
                    <DropdownInputVoucher
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
                    <DropdownInputVoucher
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
                onPress={() => handleInputVoucher(id,
                    voucher,
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
                style={{ padding: 10, backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: Color.icon }}>Input</Text>
            </TouchableOpacity>
            <Modal isVisible={modal} statusBarTranslucent>
                {modalType === 'error-get-data-id' ||'error-input-voucher' ? (
                    <ModalErrorInputKupon
                        setModal={setModal}
                        setModalType={setModalType}
                        notificationModal={notificationModal} setKupon={setVoucher} />
                ) : (
                        <SuccessInputVoucher
                            setModal={setModal}
                            notificationModal={notificationModal} />      
                )}
            </Modal>
        </View>
    );
}

export default FormInputVoucherNakami