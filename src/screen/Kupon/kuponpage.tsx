import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Kupon } from '../../models/kupon';
import { FetchKuponData, handleSearchKupon } from '../../service/fetchKupon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Color from '../../components/constant/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalInput from '../../components/kupon/inputkupon/modalinputkupon';
import BodyKuponPage from '../../components/kupon/component/bodykuponpage';
import HeaderKuponPage from '../../components/kupon/component/headerkuponpage';


const KuponPage = () => {

    const [kuponData, setKuponData] = useState<Kupon[]>([]);
    const [pointerIndex, setPointerIndex] = useState(0);
    const [getError, setGetError] = useState('');
    const [getModalError, setGetModalError] = useState(false);
    const [showSearch, setShowSearch] = useState(false)
    const [searchKuponQuery, setSearchKuponQuery] = useState('');
    const [modalInput, setModalInput] = useState(false);
    const isLoading = !kuponData ||kuponData.length === 0
    const bukaModal = () => {
        setModalInput(true)
    }
    useEffect(() => {
        if (searchKuponQuery !== '') {
            handleSearchKupon(setKuponData, setSearchKuponQuery, searchKuponQuery);
        }
        FetchKuponData(setKuponData, setGetError, setGetModalError)
    }, [searchKuponQuery]);
    
    return (
        <SafeAreaView style={{backgroundColor:Color.icon, flex:1}}>
            {/* Header */}
            <HeaderKuponPage
                searchKuponQuery={searchKuponQuery}
                setSearchKuponQuery={setSearchKuponQuery}
                setKuponData={setKuponData}
                showSearch={showSearch}
                setShowSearch={setShowSearch} setGetError={setGetError} setGetModalError={setGetModalError} />
            {/* Body */}
            <BodyKuponPage
                isLoading={isLoading}
                getError={getError}
                getModalError={getModalError}
                setGetModalError={setGetModalError}
                kuponData={kuponData}
                pointerIndex={pointerIndex}
                setPointerIndex={setPointerIndex} />
            {/* button Create */}
            <View style={style.BodyCreate}>
                <TouchableOpacity
                    style={[style.buttonCreate, { backgroundColor: Color.border }]}
                    onPress={bukaModal}>
                    <View style={{flexDirection:'row'}}>
                        <MaterialIcons name={'add'} size={20} color={Color.icon} />
                        <Text style={style.textCreate}>Input Data</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal isVisible={modalInput}>
                <ModalInput setModal={setModalInput}/>
            </Modal>
        </SafeAreaView>
    );
};

export default KuponPage;
const style = StyleSheet.create({
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
        paddingVertical:10,
        width:130,
        bottom: 0, // Fleksibel di berbagai perangkat
        left: 0,
        right: 0,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonCreate: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15
    },
    textCreate: {
        fontWeight: '400',
        color:Color.icon
    }
})
