import { ActivityIndicator, Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Color from '../../components/constant/color'
import { CustomerNkm } from '../../models/customerNakami'
import { FetchCustomerNKMTotalIdCustomer } from '../../service/fetchCustomerNakami'
import RenderCustomerNakamiPage from './rendercustomerpagenkm'
import ListHeaderCustNKM from '../../components/customer_nakami/headerCust/listHeaderCustNKM'
import DynamicHeaderCustNKM from '../../components/customer_nakami/headerCust/dynamicHeaderCustNKM'

const CustomerNakamiPage = () => {
    const [customerData, setCustomerData] = useState<CustomerNkm[]>([])
    const [modalCustomer, setModalCustomer] = useState(false)
    const [pointerIndex, setPointerIndex] = useState(0)
    const [notificationModalCustomer, setNotificationModalCustomer] = useState('')
    const [searching, setSearching] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [refreshAnimation] = useState(new Animated.Value(0));
    const navigation = useNavigation();
    const [refreshRotation, setRefreshRotation] = useState(new Animated.Value(0));
    const isLoading = !customerData || customerData.length === 0;
    const scrollY = useRef(new Animated.Value(0)).current;
    const stickyTop = scrollY.interpolate({
        outputRange: [110, 0], // Memperkecil header saat di-scroll ke atas
        inputRange: [0, 110], // Sesuaikan dengan jarak scroll yang diinginkan
        extrapolate: 'clamp',
    });

    const stickyOpacity = scrollY.interpolate({
        outputRange: [1, 0], // Membesarakan opacity saat di-scroll ke atas
        inputRange: [0, 120], // Sesuaikan dengan jarak scroll yang diinginkan
        extrapolate: 'clamp',
    });

    useEffect(() => {
        FetchCustomerNKMTotalIdCustomer(setCustomerData, setNotificationModalCustomer, setModalCustomer);
    }, []);

    useEffect(() => {
        FetchCustomerNKMTotalIdCustomer(setCustomerData, setNotificationModalCustomer, setModalCustomer);
        if (!refresh) {
            refreshAnimation.setValue(1);
        }
    }, [refresh, refreshAnimation]);

    return (
        <SafeAreaView style={{ backgroundColor: Color.icon }}>
            {/* Header */}
            <View style={{paddingTop:10}}>
                {isLoading ? (
                    <View style={{ backgroundColor: Color.icon, paddingHorizontal: 10 }}>
                        <ListHeaderCustNKM
                            searching={searching}
                            setSearching={setSearching}
                            setCustomerData={setCustomerData}
                            setNotificationModalCustomer={setNotificationModalCustomer}
                            setModalCustomer={setModalCustomer}
                            setRefresh={setRefresh}
                            refreshAnimation={refreshAnimation}
                            refreshRotation={refreshRotation}
                            setRefreshRotation={setRefreshRotation}      
                        />
                        <ActivityIndicator size="large" color={Color.border} />
                    </View>
                ) : (
                        <>
                            <Animated.View style={{
                                backgroundColor: Color.icon,
                                paddingHorizontal: 10,
                                paddingBottom: 5,
                                opacity: stickyOpacity,
                                height: stickyTop
                            }}>
                                <ListHeaderCustNKM
                                    searching={searching}
                                    setSearching={setSearching}
                                    setCustomerData={setCustomerData}
                                    setNotificationModalCustomer={setNotificationModalCustomer}
                                    setModalCustomer={setModalCustomer}
                                    setRefresh={setRefresh}
                                    refreshAnimation={refreshAnimation}
                                    refreshRotation={refreshRotation}
                                    setRefreshRotation={setRefreshRotation}
                                />
                            </Animated.View>
                            <FlatList
                                data={customerData}
                                showsHorizontalScrollIndicator={false}
                                maxToRenderPerBatch={5}
                                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                                    useNativeDriver: false
                                })}
                                windowSize={10}
                                contentContainerStyle={{
                                    gap: 10,
                                    backgroundColor: 'white',
                                    paddingVertical: 10,
                                    borderRadius: 20
                                }}
                                style={{ paddingHorizontal: 10, paddingTop: 5 }}
                                renderItem={({ item, index }) => (
                                    <RenderCustomerNakamiPage item={item} index={index} pointerIndex={pointerIndex} setPointerIndex={setPointerIndex} />
                                )} />
                        </>
                )}
            </View>
            <View style={[,styles.containerButtonAdd, { position: isLoading ? 'relative' : 'absolute' }]}>
                <TouchableOpacity
                    style={styles.buttonAdd} onPress={() => { navigation.navigate('AddCustomerNakami' as never) }}>
                    <Text>Add ID</Text>
                </TouchableOpacity>
            </View>
            <DynamicHeaderCustNKM
                searching={searching}
                setSearching={setSearching}
                setCustomerData={setCustomerData}
                scrollY={scrollY}
                setModalCustomer={setModalCustomer}
                setNotificationModalCustomer={setNotificationModalCustomer}
            />
        </SafeAreaView>
    )
}

export default CustomerNakamiPage

const styles = StyleSheet.create({
    containerButtonAdd: {
        bottom: 0,
        right: 0,
        left: 0,
        padding: 20
    },
    buttonAdd: {
        backgroundColor: Color.background,
        width: '30%',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})