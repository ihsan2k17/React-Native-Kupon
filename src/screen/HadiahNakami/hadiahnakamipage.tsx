import { StyleSheet, Text, View, TouchableOpacity, Animated, StatusBar, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { HadiahNKM } from '../../models/hadiahNakami'
import { BottomSheetRefProps } from '../../components/bottomsheet'
import { FetchBarangPerPeriodeNKM, FetchHadiahDataNKM, handleRefreshHadiahNKM } from '../../service/fetchHadiahNakami'
import Color from '../../components/constant/color'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Poppins } from '../../components/constant/font'
import { PeriodeDummyHadiahNakami, PeriodeDummyy } from '../../components/constant/poin'
import BottomSheetHdhNakami from '../../components/hadiah_nakami/bottomSheetHdhnkm'
import CreateHadiahNKM from './createhdhNkm'
import RenderHadiahNakamiPage from './renderHadiahNakamiPage'

const HadiahNakamiPage = () => {
    const [HadiahData, setHadiahData] = useState<HadiahNKM[]>([]);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [periode, setPeriode] = useState('');
    const [getError, setGetError] = useState('');
    const [getModalError, setGetModalError] = useState(false);
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(false)
    const [refreshAnimation] = useState(new Animated.Value(0));
    const [refreshRotation, setRefreshRotation] = useState(new Animated.Value(0));
    const isLoading = !HadiahData || HadiahData.length === 0;
    const ref = useRef<BottomSheetRefProps>(null);

    const onPress = useCallback(() => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(0);
        } else {
            ref?.current?.scrollTo(-300);
        }
    }, []);


    const selectPeriode = (selected: string) => {
        setPeriode(selected);
    }

    useEffect(() => {
        if (periode === '') {
            FetchHadiahDataNKM(setHadiahData, setGetError, setGetModalError)
        } else if (periode) {
            FetchBarangPerPeriodeNKM(setHadiahData, setGetError, setGetModalError, periode)
        }
    }, [periode]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.icon, paddingBottom: 10 }}>
            <StatusBar backgroundColor={Color.icon} />
            <View style={styles.divHeader}>
                <TouchableOpacity style={styles.buttonBack} onPress={() => {
                    navigation.navigate("TabStack" as never);
                }}>
                    <Icons name="arrow-back" size={24} color={Color.icon} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.textHadiah}>Hadiah Nakami</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.buttonRefresh}
                    onPress={() => handleRefreshHadiahNKM(setRefresh, refreshAnimation, refreshRotation, setRefreshRotation, setHadiahData, setGetError, setGetModalError)}
                >
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
                        <Icons name='autorenew' size={24} color={Color.icon} />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, backgroundColor: Color.icon }}>
                <View style={{ flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15 }}>
                    <TouchableOpacity onPress={() => { selectPeriode('') }}>
                        <Text style={{
                            fontSize: !periode ? 19 : 16,
                            fontFamily: !periode ? Poppins.Bold : Poppins.SemiBold,
                            color: !periode ? Color.text : Color.border
                        }}>
                            All Hadiah
                        </Text>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                        <FlatList
                            data={PeriodeDummyHadiahNakami} //PeriodeDummy ini ada nya di constant file poin.ts
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.toString()}
                            contentContainerStyle={{
                                paddingHorizontal: 10,
                                gap: 15
                            }}
                            horizontal={true}
                            renderItem={({ item }) =>
                            (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => selectPeriode(item.toString())}>
                                    <Text style={{
                                        fontSize: item.toString() === periode ? 16 : 14,
                                        color: item.toString() === periode ? Color.text : Color.border,
                                        fontFamily: item.toString() === periode ? Poppins.Bold : Poppins.SemiBold
                                    }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color={Color.border} />) :
                    (
                        <FlatList
                            data={HadiahData}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: 10,
                                gap: 15
                            }}
                            renderItem={({ item, index }) => (
                                <RenderHadiahNakamiPage
                                    item={item}
                                    index={index}
                                    categoryIndex={categoryIndex}
                                    setCategoryIndex={setCategoryIndex}
                                />
                            )}
                        />
                    )
                }
            </View>
            { /* footer  */}
            <View style={styles.bodyCreate}>
                <TouchableOpacity
                    onPress={onPress}
                    style={styles.buttonCreate}
                >
                    <Icons name="edit" size={24} color={Color.icon} />
                </TouchableOpacity>
            </View>
            <BottomSheetHdhNakami ref={ref}>
                <CreateHadiahNKM />
            </BottomSheetHdhNakami>
        </SafeAreaView>
    )
}

export default HadiahNakamiPage

const styles = StyleSheet.create({
    divHeader: {
        flexDirection: 'row', padding: 15, alignItems: 'flex-end'
    },
    buttonBack: {
        backgroundColor: Color.border,
        borderRadius: 15,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHadiah: {
        fontSize: 25, fontFamily:Poppins.Black, color: Color.border
    },
    buttonRefresh: {
        backgroundColor: Color.border,
        borderRadius: 15,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyCreate: {
        position: 'absolute',
        paddingVertical: 10,
        bottom: 0, // Fleksibel di berbagai perangkat
        left: 0,
        right: 0,
        paddingLeft: '83%',
        paddingBottom: '5%'
    },
    buttonCreate: {
        width: 50,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 52,
        backgroundColor: Color.border,
    }
})