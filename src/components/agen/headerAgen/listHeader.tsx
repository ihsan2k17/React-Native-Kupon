import { Animated, NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInput, TextInputSubmitEditingEventData, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Poppins } from '../../constant/font';
import Color from '../../constant/color';
import { useNavigation } from '@react-navigation/native';
import { FetchAgen, handleRefreshAgen, searchAgen } from '../../../service/fetchAgen';
import { Agen } from '../../../models/agen';
import { debounce } from '../../search/debounceDelaySearch';

interface listHeaderProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setAgenData: React.Dispatch<React.SetStateAction<Agen[]>>;
    setNotification: React.Dispatch<React.SetStateAction<string>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
}
const fakeDelay = (ms: number): Promise<void> => new Promise<void>((res) => setTimeout(res, ms));

const ListHeader = ({
    searchQuery,
    setSearchQuery, setAgenData, setNotification, setModal, setModalType, setRefresh, refreshAnimation, refreshRotation, setRefreshRotation }: listHeaderProps) => {
    const [timeoutToClear, setTimeoutToClear] = useState<number | null>(null);
    const navigation = useNavigation()
    const submitedit = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const { text } = event.nativeEvent;
        setSearchQuery(text);
        await searchAgen(searchQuery, setSearchQuery, setAgenData, setNotification, setModal, setModalType)
    }

    const clearData = () => {
        // Logika untuk menghapus string pencarian
        setSearchQuery('');
        // pembaruan data atau aksi lainnya setelah menghapus pencarian
        FetchAgen(setAgenData, setNotification, setModal);
    }
    useEffect(() => {
        return () => {
            if (timeoutToClear) {
                clearTimeout(timeoutToClear);
            }
        };
    }, [timeoutToClear]);

    const setSearchTextAlways = (text: string) => {
        setSearchQuery(text);
    };

    const constSearchAgen = async (text: string) => {
        setSearchQuery(text);
        await fakeDelay(3000);
        searchAgen(text, setSearchQuery, setAgenData, setNotification, setModal, setModalType)
    }
    const delayedSearch = debounce(constSearchAgen, setSearchTextAlways, 1000)

    return (
        <SafeAreaView style={{ paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.TouchableBack}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontFamily: Poppins.ExtraBold }}>Agen Page</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        handleRefreshAgen(setRefresh, refreshAnimation, refreshRotation,
                            setRefreshRotation, setAgenData, setNotification, setModal)
                    }}
                    style={styles.TouchableBack}
                    activeOpacity={1}
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
            <View style={{ paddingTop: 10, }}>
                <View style={{ borderWidth: 2, flexDirection: 'row', gap: 5, borderRadius: 20, paddingHorizontal: 10 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <MaterialIcons name='search' size={24} color={Color.border} />
                    </View>
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder='Search Agen'
                        value={searchQuery}
                        onChangeText={delayedSearch}
                        onSubmitEditing={submitedit}
                        clearButtonMode='always'
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            style={styles.clear}
                            onPress={clearData}>
                            <MaterialIcons name='cancel' size={20} color={Color.border} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ListHeader

const styles = StyleSheet.create({
    TouchableBack: {
        backgroundColor: Color.border,
        borderRadius: 15,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clear: {
        alignItems: 'center',
        justifyContent:'center'
    }
})