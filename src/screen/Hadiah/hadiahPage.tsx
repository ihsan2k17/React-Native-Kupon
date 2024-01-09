import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Animated } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Hadiah } from '../../models/hadiah';
import Color from '../../components/constant/color';
import RenderItem from './renderitem';
import { StatusBar } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import { FetchBarangPerPeriode, FetchHadiahData, handleRefreshHadiah } from '../../service/fetchHadiah';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Poppins } from '../../components/constant/font';
import BottomSheet, { BottomSheetRefProps } from '../../components/bottomsheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CreateHadiah from './create';
import BottomSheetHdh from '../../components/hadiah/bottomSheetHdh';
import { PeriodeDummyy } from '../../components/constant/poin';

const HadiahPage = () => {
    const [HadiahData, setHadiahData] = useState<Hadiah[]>([]);
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
            FetchHadiahData(setHadiahData, setGetError, setGetModalError)
        } else if (periode) {
            FetchBarangPerPeriode(setHadiahData, setGetError, setGetModalError, periode)   
        }
    }, [periode]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.icon, paddingBottom:10 }}>
            <StatusBar backgroundColor={Color.icon} />
            <View style={styles.divHeader}>
                <TouchableOpacity style={styles.buttonBack} onPress={() => {
                    navigation.navigate("TabStack" as never);
                }}>
                    <Icons name="arrow-back" size={ 24 } color={Color.icon}/>
                </TouchableOpacity>
                <View style={{flex:1,alignItems: 'center'}}>
                    <Text style={styles.textHadiah}>Hadiah</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.buttonRefresh}
                    onPress={() => handleRefreshHadiah(setRefresh,refreshAnimation, refreshRotation,setRefreshRotation, setHadiahData,setGetError, setGetModalError)}
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
                        <MaterialIcons name='autorenew' size={24} color={Color.icon} />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <View style={{flex:1, backgroundColor: Color.icon}}>
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
                            data={PeriodeDummyy} //PeriodeDummy ini ada nya di constant file poin.ts
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
                                <RenderItem
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
            { /* footer  */ }
            <View style={styles.bodyCreate}>
                <TouchableOpacity
                    onPress={onPress}
                    style={styles.buttonCreate}
                >
                    <MaterialIcons name="edit" size={24} color={Color.icon} />
                </TouchableOpacity>
            </View>
            <BottomSheetHdh ref={ref}>
                <CreateHadiah/>
            </BottomSheetHdh>
        </SafeAreaView>
    )
}
export default HadiahPage
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
        fontSize: 30, fontWeight: 'bold', color: Color.text
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
