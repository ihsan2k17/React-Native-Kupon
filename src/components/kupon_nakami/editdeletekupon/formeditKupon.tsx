import { StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropdownKupon from '../dropdown/dropdownKuponnkm'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../../constant/color'
import DropdownNamaHadiah from '../dropdown/dropdownnamahadiahnkm'
import DropdownEditKupon from '../dropdown/dropdownEditKupon/dropdowneditkypon'
import DropdownPeriode from '../dropdown/dropdownperiodenkm'
import { HadiahNKM } from '../../../models/hadiahNakami'
import { FetchPoinHadiahNKM } from '../../../service/fetchHadiahNakami'

interface props {
    kupon: number | undefined, setKupon: React.Dispatch<React.SetStateAction<number | undefined>>,
    tahun: number | undefined, setTahun: React.Dispatch<React.SetStateAction<number | undefined>>,
    hadiah: number | undefined, setHadiah: React.Dispatch<React.SetStateAction<number | undefined>>,
    hadiahke: number | undefined, setHadiahke: React.Dispatch<React.SetStateAction<number | undefined>>,
    namahadiah: string, setNamahadiah: React.Dispatch<React.SetStateAction<string>>,
    periode: number | undefined, setPeriode: React.Dispatch<React.SetStateAction<number | undefined>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
}
const FormEditKuponNakami = ({kupon, setKupon, tahun, setTahun,
    hadiah, setHadiah, hadiahke, setHadiahke, namahadiah, setNamahadiah, periode, setPeriode,
    setModal, setNotificationModal }: props) => {
    const [listPoinHadiah, setListPoinHadiah] = useState<HadiahNKM[]>([]);
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
            FetchPoinHadiahNKM(setListPoinHadiah, setNotificationModal, setModal)
        }
    }, [isPoinHadiahDropdownVisible])
    return (
        <View style={{backgroundColor:'white', borderRadius:20, paddingVertical:10}}>
            <View style={styles.rowFrom}>
                <DropdownKupon kupon={kupon} setKupon={setKupon} />
                <DropdownEditKupon
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

export default FormEditKuponNakami

const styles = StyleSheet.create({
    rowFrom: {
        flexDirection: 'row', justifyContent: 'space-around', gap: 10
    },
    containerButtonEdit: {
        paddingHorizontal:100, paddingVertical:10
    },
    buttonEdit: {
        padding: 5, backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', borderRadius:20
    }
})