import { Animated, NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputSubmitEditingEventData, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Poppins } from '../../constant/font'
import Color from '../../constant/color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { KuponNKM } from '../../../models/kuponNakami'
import { fetchDataKuponNakamiById, handleRefreshNakami, handleSearchDetailKuponVoucherNakami } from '../../../service/fetchKuponNakami'

interface props {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    refreshAnimation: Animated.Value;
    refreshRotation: Animated.Value;
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>;
    kuponnakamiId: number | undefined;
    kuponnakamiPoin: number | undefined;
    kuponnakamiTahun: number | undefined;
    kuponnakamiUser: string;
    kuponnakamiNamaHadiah: string;
    kuponnakamiHadiah: number | undefined;
    kuponnakamiPeriode: number | undefined;
    setKuponData: React.Dispatch<React.SetStateAction<KuponNKM[]>>;
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>;
    setGetError: React.Dispatch<React.SetStateAction<string>>;
    selectedNamaCustomer: string; selectedPoin: number | undefined;
    selectedTahun: number | undefined; selectedNamaHadiah: string;
    selectedID: number | undefined;
    showSearch: boolean;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchKuponQuery: React.Dispatch<React.SetStateAction<string>>;
    searchKuponQuery: string;
}
const TheHeadersNKM = ({
    setRefresh,
    refreshAnimation,
    refreshRotation,
    setRefreshRotation,
    kuponnakamiId,
    kuponnakamiPoin,
    kuponnakamiTahun,
    kuponnakamiUser,
    kuponnakamiHadiah,
    kuponnakamiPeriode,
    setKuponData,
    setGetError,
    setGetModalError,
    selectedNamaCustomer,
    selectedPoin,
    selectedTahun,
    selectedNamaHadiah,
    selectedID,
    kuponnakamiNamaHadiah,
    showSearch, setShowSearch,
    setSearchKuponQuery, searchKuponQuery
}: props) => {
    const navigation = useNavigation();
    const onSubmitEditing = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const { text } = event.nativeEvent;
        setSearchKuponQuery(text);
        if (kuponnakamiId !== undefined && kuponnakamiPoin !== undefined) {
            await handleSearchDetailKuponVoucherNakami(kuponnakamiId, kuponnakamiPoin, kuponnakamiNamaHadiah, setKuponData, setSearchKuponQuery, searchKuponQuery);
        }
    };
    const clearData = () => {
        setSearchKuponQuery('')
        if (
            kuponnakamiId !== undefined && kuponnakamiPoin !== undefined &&
            kuponnakamiTahun !== undefined && kuponnakamiHadiah !== undefined &&
            kuponnakamiPeriode !== undefined) {
            fetchDataKuponNakamiById(kuponnakamiId, kuponnakamiPoin, kuponnakamiTahun, kuponnakamiUser,
                kuponnakamiHadiah, kuponnakamiPeriode, setKuponData, setGetError, setGetModalError
            );
        }
    }

    return (
        <View style={{ paddingTop: selectedNamaHadiah.length > 34 ? 5 : 10, paddingHorizontal:10, backgroundColor: Color.icon }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={style.containerTouchableHead} activeOpacity={0.8} onPress={() => {
                    navigation.goBack()
                }}>
                    <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={style.containerTouchableHead} activeOpacity={0.8}
                    onPress={() => handleRefreshNakami(
                        setRefresh,
                        refreshAnimation,
                        refreshRotation,
                        setRefreshRotation,
                        kuponnakamiId,
                        kuponnakamiPoin,
                        kuponnakamiTahun,
                        kuponnakamiUser,
                        kuponnakamiHadiah,
                        kuponnakamiPeriode,
                        setKuponData,
                        setGetError,
                        setGetModalError
                    )}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: selectedNamaHadiah.length > 34 ? 5 : 10, }}>
                <View style={{ width: '79%'}}>
                    <Text style={{
                        color: Color.border, fontSize: selectedNamaCustomer.length > 20 ? 17 : 20, fontFamily: Poppins.Black,
                    }}>{selectedNamaCustomer}</Text>
                    <View style={{ justifyContent: 'space-between', paddingTop: selectedNamaHadiah.length > 34 ? 0 : 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: Color.border, fontSize: 14, fontFamily: Poppins.Bold }}>Poin: {selectedPoin}, Tahun: {selectedTahun}</Text>
                        </View>
                        <Text style={{ color: Color.border, fontSize: selectedNamaHadiah.length > 34 ? 13.5:14, fontFamily: Poppins.Bold }}>{selectedNamaHadiah}</Text>
                    </View>
                </View>
                <View style={style.containerHeaderId}>
                    <Text style={{ fontSize: 20, fontFamily: Poppins.Black, color: 'white' }}>{selectedID}</Text>
                </View>
            </View>
            {/* SEARCH */}
            <View style={{ paddingTop: selectedNamaCustomer.length > 20 || selectedNamaHadiah.length > 34 ? 17 : 15 }}>
                <View style={{
                    borderWidth: 2, flexDirection: 'row', gap: 5, borderRadius: 20, paddingHorizontal: 10,
                    borderColor: Color.border
                }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setShowSearch(!showSearch)}
                        style={{ justifyContent: 'center', height: 45 }}>
                        <MaterialIcons name='search' size={showSearch ? 20 : 24} style={{ color: Color.border }} />
                    </TouchableOpacity>
                    {showSearch && (
                        <>
                            <TextInput
                                style={{ flex: 1, height: 45 }}
                                placeholder='Search Kupon'
                                value={searchKuponQuery}
                                onChangeText={setSearchKuponQuery}
                                onSubmitEditing={onSubmitEditing}
                            />
                            {searchKuponQuery.length > 0 && (
                                <TouchableOpacity
                                    onPress={clearData}
                                    style={{ alignItems: 'center', justifyContent: 'center', height: 45 }}
                                >
                                    <MaterialIcons name='cancel' size={20} color={Color.border} />
                                </TouchableOpacity>
                            )}
                        </>
                    )}
                </View>
            </View>
        </View>
    ) 
}

export default TheHeadersNKM

const style = StyleSheet.create({
    inputSearch: {
        height: 40,
        width: 280,
        borderRadius: 5,
        marginRight: 10,
        fontFamily: Poppins.Regular
    },
    containerTouchableHead: {
        height: 40, width: 40,
        backgroundColor: Color.border, borderRadius: 15,
        justifyContent: 'center', alignItems: 'center'
    },
    containerHeaderId: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.border,
        paddingHorizontal: 15,
        borderRadius: 15,
        height: 60
    },
})