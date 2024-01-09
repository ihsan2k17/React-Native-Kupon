import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Hadiah } from '../../../models/hadiah';
import { FetchPoinHadiah } from '../../../service/fetchHadiah';
import Color from '../../constant/color';
import { Poppins } from '../../constant/font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropdownVoucher from '../dropdown/dropdownvcrnkm';
import DropdownNamaHadiah from '../dropdown/dropdownnamahadiahnkm';
import DropdownPeriode from '../dropdown/dropdownperiodenkm';
import DropdownEditVoucher from '../dropdown/dropdownEditVcr/dropdowneditvcr';
interface props {
    voucher: number | undefined, setVoucher: React.Dispatch<React.SetStateAction<number | undefined>>,
    tahun: number | undefined, setTahun: React.Dispatch<React.SetStateAction<number | undefined>>,
    hadiah: number | undefined, setHadiah: React.Dispatch<React.SetStateAction<number | undefined>>,
    hadiahke: number | undefined, setHadiahke: React.Dispatch<React.SetStateAction<number | undefined>>,
    namahadiah: string, setNamahadiah: React.Dispatch<React.SetStateAction<string>>,
    periode: number | undefined, setPeriode: React.Dispatch<React.SetStateAction<number | undefined>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
}
const FormEditVoucher = ({ voucher, setVoucher, tahun, setTahun, hadiah, setHadiah, hadiahke,
    setHadiahke, namahadiah, setNamahadiah, periode, setPeriode, setModal, setNotificationModal }: props) => {
    const [listPoinHadiah, setListPoinHadiah] = useState<Hadiah[]>([]);
    const [isPoinHadiahDropdownVisible, setPoinHadiahDropdownVisible] = useState(false);
    const toggledropdownPoinHadiah = async () => {
        setPoinHadiahDropdownVisible(!isPoinHadiahDropdownVisible)
    };
    const handleDropdownOptionSelect = (selectedValue: string | number) => {
        if (typeof selectedValue === 'string') {

        } else if (typeof selectedValue === 'number') {
            if (isPoinHadiahDropdownVisible) {
                setHadiah(selectedValue);
                toggledropdownPoinHadiah()
            }
        }
    }
    useEffect(() => {
        if (isPoinHadiahDropdownVisible) {
            FetchPoinHadiah(setListPoinHadiah, setNotificationModal, setModal)
        }
    }, [isPoinHadiahDropdownVisible])
    return (
        <View style={{ backgroundColor: 'white', borderRadius: 20, paddingVertical: 10 }}>
            <View style={styles.rowFrom}>
                <DropdownVoucher voucher={voucher} setVoucher={setVoucher} />
                <DropdownEditVoucher
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
            </View>
            <View style={styles.rowFrom}>
                <DropdownNamaHadiah namahadiah={namahadiah} setNamahadiah={setNamahadiah} hadiah={hadiah} />
            </View>
            <View style={styles.rowFrom}>
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
            <View style={styles.rowFrom}>
                <DropdownPeriode periode={periode} setPeriode={setPeriode} />
            </View>
        </View>
    )
}

export default FormEditVoucher

const styles = StyleSheet.create({
    rowFrom: {
        flexDirection: 'row', justifyContent: 'space-around', gap: 10
    },
    containerButtonEdit: {
        paddingHorizontal: 100, paddingVertical: 10
    },
    buttonEdit: {
        padding: 5, backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', borderRadius: 20
    }
})