import { Animated, NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInput, TextInputSubmitEditingEventData, TouchableOpacity, View } from 'react-native'
import React, {  } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import Color from '../../constant/color';
import { Poppins } from '../../constant/font';
import { Customer } from '../../../models/customer';
import { FetchCustomerTotalIdCustomer, handleRefreshCount, handleSearchCustomer } from '../../../service/fetchCustomer';

interface ListProps {
    searching: string;
    setSearching: React.Dispatch<React.SetStateAction<string>>;
    setCustomerData: React.Dispatch<React.SetStateAction<Customer[]>>;
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>;
    setModalCustomer: React.Dispatch<React.SetStateAction<boolean>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
}
const ListHeaderCust = ({
    searching, setSearching, setCustomerData, setNotificationModalCustomer,
    setModalCustomer, setRefresh, refreshAnimation, refreshRotation, setRefreshRotation }: ListProps) => {
    const navigation = useNavigation();


    const submitedit = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const { text } = event.nativeEvent;
        setSearching(text);
        await handleSearchCustomer(searching, setCustomerData);
    };
    const clearData = () => {
        setSearching('');
        FetchCustomerTotalIdCustomer(setCustomerData, setNotificationModalCustomer, setModalCustomer);
    };

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.TouchableBack}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                </TouchableOpacity>
                <View style={{justifyContent:'center'}}>
                    <Text style={{ fontSize: 20, fontFamily: Poppins.Bold, color:Color.border, textAlign:'center' }}>Customer Naiba</Text>
                </View>
                <TouchableOpacity
                    style={styles.TouchableBack}
                    onPress={() => handleRefreshCount(
                        setRefresh, refreshAnimation, refreshRotation,
                        setRefreshRotation, setCustomerData, setNotificationModalCustomer, setModalCustomer)}
                    activeOpacity={1}>
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
            <View style={{ paddingTop: 10, }}>
                <View style={{ borderWidth: 2, flexDirection: 'row', gap: 5, borderRadius: 20, paddingHorizontal: 10 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <MaterialIcons name='search' size={24} color={Color.border} />
                    </View>
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder='Search'
                        value={searching}
                        onChangeText={(text) => setSearching(text)}
                        onSubmitEditing={submitedit}
                    />
                    {searching.length > 0 && (
                        <TouchableOpacity
                            onPress={clearData}
                            style={{alignItems:'center', justifyContent:'center'}}
                        >
                            <MaterialIcons name='cancel' size={20} color={Color.border} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ListHeaderCust

const styles = StyleSheet.create({
    TouchableBack: {
        backgroundColor: Color.border,
        borderRadius: 15,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})