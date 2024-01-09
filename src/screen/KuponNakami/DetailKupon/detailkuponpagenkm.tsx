import { View, Text, FlatList, StyleSheet, NativeSyntheticEvent, TextInputSubmitEditingEventData, TextInput, Animated, Easing, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Kupon } from '../../../models/kupon';
import { RootStackParamList } from '../../../navigator/rootstack';
import { fetchDataById, handleRefresh, handleSearchDetailKuponVoucher } from '../../../service/fetchKupon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../../../components/constant/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DetailsItem from './detailitemnkm';
import { Poppins } from '../../../components/constant/font';
import { fetchDataKuponNakamiById, handleSearchDetailKuponVoucherNakami } from '../../../service/fetchKuponNakami';
import { KuponNKM } from '../../../models/kuponNakami';
import TheHeadersNKM from '../../../components/kupon_nakami/detailkupon/theheadersNKM';

type DetailKuponPageProps = {
    route: RouteProp<RootStackParamList, 'DetailKuponNakamiPage'>;
};

const DetailKuponNakamiPage = ({ route }: DetailKuponPageProps) => {
    const { kuponnakamiId } = route.params;
    const { kuponnakamiPoin } = route.params;
    const { kuponnakamiNamaHadiah } = route.params;
    const { kuponnakamiHadiah } = route.params;
    const { kuponnakamiUser } = route.params;
    const { kuponnakamiTahun } = route.params;
    const { kuponnakamiPeriode } = route.params
    const [kuponData, setKuponData] = useState<KuponNKM[]>([]);
    const [selectedPointerIndex, setSelectedPointerIndex] = useState<number>(-1);
    const [getError, setGetError] = useState('');
    const [getModalError, setGetModalError] = useState(false);
    const [selectedID, setSelectedID] = useState<number>();
    const [selectedNamaCustomer, setSelectedNamaCustomer] = useState('');
    const [selectedPoin, setSelectedPoin] = useState<number>();
    const [selectedNamaHadiah, setSelectedNamaHadiah] = useState('');
    const [selectedTahun, setSelectedTahun] = useState<number>()
    const [showSearch, setShowSearch] = useState(false)
    const [searchKuponQuery, setSearchKuponQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshAnimation] = useState(new Animated.Value(0));
    const [refreshRotation, setRefreshRotation] = useState(new Animated.Value(0));
    const isLoading = !kuponData || kuponData.length === 0;
    const {height} = Dimensions.get('window')
    const maxHeight_Header = height * 0.32;
    const minHeight_Header = height * 0;
    const scrollDistance = maxHeight_Header - minHeight_Header;
    const scrollY = useRef(new Animated.Value(0)).current;
    const AnimatedHeader = scrollY.interpolate({
        outputRange: [maxHeight_Header, 75], // maxHeight_Header untuk mengukur awal ketinggian pada height, 65 untuk akhir ketinggian height setelah di scroll 
        inputRange: [0, scrollDistance], //0 berfungsi untuk range jarak scroll yang akan digerakan pertama kali, scrollDistance berfungsi untuk range jarak hingga akhir 
        extrapolate: 'clamp',
    })
    const AnimatedTop = scrollY.interpolate({
        // minHeight_Header UNTUK MENGUKUR POSISI atas awal, 65 - maxHeight_Header untuk mengukur posisi akhir atas untuk mendapatkan hasil - dari maxheigth yang dikurang 65
        outputRange: [minHeight_Header, 75 - maxHeight_Header],
        // 0 untuk mengatur range jarak saat scroll digerakan pertama kali, scrollDistance berfungsi untuk range jarak hingga akhir 
        inputRange: [0, scrollDistance],
        extrapolate: 'clamp'
    })

    
    useEffect(() => {
        if (searchKuponQuery !== '') {
            if (kuponnakamiId !== undefined && kuponnakamiPoin !== undefined) {
                handleSearchDetailKuponVoucherNakami(
                    kuponnakamiId,
                    kuponnakamiPoin,
                    kuponnakamiNamaHadiah,
                    setKuponData,
                    setSearchKuponQuery,
                    searchKuponQuery);   
            }
        } else {
            // Jika searchKuponQuery kosong, panggil fungsi untuk mendapatkan data awal
            if (
                kuponnakamiId !== undefined &&
                kuponnakamiPoin !== undefined &&
                kuponnakamiHadiah !== undefined &&
                kuponnakamiTahun !== undefined &&
                kuponnakamiPeriode !== undefined
                ) {
                fetchDataKuponNakamiById(kuponnakamiId, kuponnakamiPoin,kuponnakamiTahun, kuponnakamiUser, kuponnakamiHadiah, kuponnakamiPeriode, setKuponData, setGetError, setGetModalError);
            }
        };
        if (!isRefreshing) {
            refreshAnimation.setValue(1)
        }
    }, [searchKuponQuery, isRefreshing, refreshAnimation]);

    useEffect(() => {
        // Mengatur nilai selectedNamaCustomer ketika kuponData berubah
        if (kuponData.length > 0) {
            setSelectedNamaCustomer(kuponData[0].NamaCustomer);
            setSelectedPoin(kuponData[0].Poin);
            setSelectedID(kuponData[0].ID);
            setSelectedNamaHadiah(kuponData[0].Nama_Hadiah);
            setSelectedTahun(kuponData[0].Tahun);
        }
    }, [kuponData]);


    return (
        <SafeAreaView style={{ backgroundColor: Color.icon, flex: 1, paddingHorizontal: 5 }}>
            {isLoading ? (
                <>
                    <TheHeadersNKM
                        setRefresh={setIsRefreshing} refreshAnimation={refreshAnimation}
                        refreshRotation={refreshRotation} kuponnakamiId={kuponnakamiId} kuponnakamiPoin={kuponnakamiPoin}
                        kuponnakamiTahun={kuponnakamiTahun} setGetModalError={setGetModalError} setGetError={setGetError}
                        selectedNamaCustomer={selectedNamaCustomer} selectedPoin={selectedPoin} selectedTahun={selectedTahun}
                        selectedNamaHadiah={selectedNamaHadiah} selectedID={selectedID} showSearch={showSearch}
                        setShowSearch={setShowSearch} setSearchKuponQuery={setSearchKuponQuery}
                        searchKuponQuery={searchKuponQuery} setRefreshRotation={setRefreshRotation} kuponnakamiUser={kuponnakamiUser}
                        kuponnakamiNamaHadiah={kuponnakamiNamaHadiah} kuponnakamiHadiah={kuponnakamiHadiah}
                        kuponnakamiPeriode={kuponnakamiPeriode} setKuponData={setKuponData} />
                    <ActivityIndicator size="large" color={Color.border} />
                </>
            ) : (
                <>
                    <Animated.View style={{
                        paddingTop: 10,
                        top: AnimatedTop,
                        height: AnimatedHeader
                    }}>
                        <TheHeadersNKM
                            setRefresh={setIsRefreshing} refreshAnimation={refreshAnimation}
                            refreshRotation={refreshRotation} kuponnakamiId={kuponnakamiId} kuponnakamiPoin={kuponnakamiPoin}
                            kuponnakamiTahun={kuponnakamiTahun} setGetModalError={setGetModalError} setGetError={setGetError}
                            selectedNamaCustomer={selectedNamaCustomer} selectedPoin={selectedPoin} selectedTahun={selectedTahun}
                            selectedNamaHadiah={selectedNamaHadiah} selectedID={selectedID} showSearch={showSearch}
                            setShowSearch={setShowSearch} setSearchKuponQuery={setSearchKuponQuery}
                            searchKuponQuery={searchKuponQuery} setRefreshRotation={setRefreshRotation} kuponnakamiUser={kuponnakamiUser}
                            kuponnakamiNamaHadiah={kuponnakamiNamaHadiah} kuponnakamiHadiah={kuponnakamiHadiah}
                            kuponnakamiPeriode={kuponnakamiPeriode} setKuponData={setKuponData} />
                    </Animated.View>
                    <View>
                        <FlatList
                            data={kuponData}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            maxToRenderPerBatch={5}
                            windowSize={10}
                            numColumns={2}
                            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                                useNativeDriver: false
                            })}
                            contentContainerStyle={{paddingBottom:maxHeight_Header}}
                            renderItem={({ item, index }) => (
                                <DetailsItem
                                    item={item}
                                    index={index}
                                    selectedPointerIndex={selectedPointerIndex}
                                    setSelectedPointerIndex={setSelectedPointerIndex}
                                />
                            )}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default DetailKuponNakamiPage;

const style = StyleSheet.create({
    CardTouchable1: {
        borderRadius: 20,
        gap: 5,
        padding: 10,
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
        paddingHorizontal:15,
        borderRadius: 15,
        height:60
    },
    cardImageContainer: {
        opacity: 0.5,
        position: 'absolute',
        height: 150,
        width:400,
        borderRadius: 20
    },
    inputSearch: {
        height: 40,
        width: 280,
        borderRadius: 5,
        marginRight: 10,
        fontFamily:Poppins.Regular
    },
    textCoupoinorVoucher: {
        fontSize: 14,
        fontFamily:Poppins.Regular
    }, 
    textinputby: {
        fontSize: 14,
        fontWeight: '600'
    }
})