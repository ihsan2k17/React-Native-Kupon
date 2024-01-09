import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderKuponNakamiPage from '../../components/kupon_nakami/component/headerkuponpageNKM';
import BodyKuponNakamiPage from '../../components/kupon_nakami/component/bodykuponpageNKM';
import { FetchKuponNakamiData, handleSearchKuponNakami } from '../../service/fetchKuponNakami';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../components/constant/color';
import { KuponNKM } from '../../models/kuponNakami';
import Modal from 'react-native-modal';
import ModalInputKuponNakami from '../../components/kupon_nakami/inputkupon/modalinputkuponnkm';

const KuponNakamiPage = () => {

    const [kuponData, setKuponData] = useState<KuponNKM[]>([]);
    const [pointerIndex, setPointerIndex] = useState(0);
    const [getError, setGetError] = useState('');
    const [getModalError, setGetModalError] = useState(false);
    const [showSearch, setShowSearch] = useState(false)
    const [searchKuponQuery, setSearchKuponQuery] = useState('');
    const [modalInput, setModalInput] = useState(false);
    const isLoading = !kuponData || kuponData.length === 0
    const bukaModal = () => {
        setModalInput(true)
    }
    useEffect(() => {
        if (searchKuponQuery !== '') {
            handleSearchKuponNakami(setKuponData, setSearchKuponQuery, searchKuponQuery);
        } else {
            FetchKuponNakamiData(setKuponData, setGetError, setGetModalError)
        }
    }, [searchKuponQuery]);
    const handleToggleStopwatch = () => {
        // Fungsi ini akan dipanggil saat tombol di stopwatch ditekan
        // Tambahkan logika yang sesuai dengan kebutuhan aplikasi Anda
        console.log('Stopwatch Toggled!');
    };

    return (
        <SafeAreaView style={{ backgroundColor: Color.icon, flex: 1 }}>
            {/* Header */}
            <HeaderKuponNakamiPage
                searchKuponQuery={searchKuponQuery}
                setSearchKuponQuery={setSearchKuponQuery}
                setKuponData={setKuponData}
                showSearch={showSearch}
                setShowSearch={setShowSearch} setGetError={setGetError} setGetModalError={setGetModalError} />
            {/* Body */}
            <BodyKuponNakamiPage
                isLoading={isLoading}
                getError={getError}
                getModalError={getModalError}
                setGetModalError={setGetModalError}
                kuponData={kuponData}
                pointerIndex={pointerIndex}
                setPointerIndex={setPointerIndex} />
            {/* button Create */}
            <View style={styles.BodyCreate}>
                <TouchableOpacity
                    style={[styles.buttonCreate, { backgroundColor: Color.border }]}
                    onPress={bukaModal}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name={'add'} size={20} color={Color.icon} />
                        <Text style={styles.textCreate}>Input Data</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal isVisible={modalInput}>
                <ModalInputKuponNakami setModal={setModalInput}/>
            </Modal>
        </SafeAreaView>
    );
}

export default KuponNakamiPage

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    inputSearch: {
        height: 40,
        width: 280,
        borderRadius: 5,
        marginRight: 10,
    },
    BodyCreate: {
        position: 'absolute',
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: 130,
        bottom: 0, // Fleksibel di berbagai perangkat
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonCreate: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15
    },
    textCreate: {
        fontWeight: '400',
        color: Color.icon
    }
})