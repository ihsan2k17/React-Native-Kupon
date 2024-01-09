import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Color from '../../components/constant/color'
import { Poppins } from '../../components/constant/font'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { handleInputHadiah } from '../../service/fetchHadiah'
import FormAddHadiah from '../../components/hadiah/addhadiah/formaddhadiah'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigator/rootstack'


const CreateHadiah = () => {
    const [hadiah, setHadiah] = useState<number|undefined>();
    const [barang, setBarang] = useState('');
    const [periode, setPeriode] = useState<number>();
    const [jenis, setJenis] = useState('');
    const [notification, setNotification] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'hadiahPage'>>()
    const tampilkanAlert = () => {
        Alert.alert(
            'Pengumuman',
            `${notification}`,
            [
                {
                    text: 'OK',
                    onPress: () => navigation.reset({
                        index: 0,
                        routes: [{ name: 'hadiahPage' }],
                    })
                },
            ],
            { cancelable: false }
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.fontAddHadiah}>ADD HADIAH</Text>
            </View>
            <FormAddHadiah
                hadiah={hadiah} barang={barang} periode={periode} jenis={jenis}
                setHadiah={setHadiah} setBarang={setBarang} setPeriode={setPeriode} setJenis={setJenis} />
            <View style={{paddingTop:10}}>
                <TouchableOpacity
                    onPress={() => {
                        if (hadiah !== undefined && periode !== undefined && barang && jenis) {
                            handleInputHadiah(hadiah, barang, periode, jenis, setNotification);
                            tampilkanAlert(); //alert untuk input hadiah berhasil dengan mengambil dari notification
                        } else {
                            tampilkanAlert(); // Tampilkan alert jika data belum diisi dengan benar
                        }
                    }}
                    style={{ padding: 5, paddingHorizontal:30,alignItems: 'center', borderRadius: 10, backgroundColor: Color.border, }}
                >
                    <Text style={styles.fontModal}>Input</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CreateHadiah

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: Color.icon,
        paddingHorizontal:10
    },
    fontAddHadiah: {
        fontSize: 19,
        fontFamily: Poppins.Black,
        color: Color.border
    },
    fontModal: {
        fontSize: 19,
        fontFamily: Poppins.Black,
        color: Color.icon
    }
})