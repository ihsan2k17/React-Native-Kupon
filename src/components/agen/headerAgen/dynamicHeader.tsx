import { Animated, NativeSyntheticEvent, SafeAreaView, StyleSheet, TextInput, TextInputSubmitEditingEventData, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Color from "../../constant/color";
import { FetchAgen, searchAgen } from "../../../service/fetchAgen";
import { Agen } from "../../../models/agen";
import { useEffect, useState } from "react";
import { debounce } from "../../search/debounceDelaySearch";

interface dynamicHeaderProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setAgenData: React.Dispatch<React.SetStateAction<Agen[]>>;
    setNotification: React.Dispatch<React.SetStateAction<string>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
    scrollY: Animated.Value
}
const fakeDelay = (ms: number): Promise<void> => new Promise<void>((res) => setTimeout(res, ms));
const DynamicHeader = ({ searchQuery, setSearchQuery, setAgenData, setNotification, setModal, setModalType, scrollY }: dynamicHeaderProps) => {
    const [timeoutToClear, setTimeoutToClear] = useState<number | null>(null);
    const stickyTop = scrollY.interpolate({
        outputRange: [-80, 0],
        inputRange: [100, 140],
        extrapolate: 'clamp'
    })
    const stickyOpacity = scrollY.interpolate({
        outputRange: [0, 1],
        inputRange: [100, 150],
        extrapolate: 'clamp'
    })
    const submitedit = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const { text } = event.nativeEvent;
        setSearchQuery(text);
        await searchAgen(searchQuery, setSearchQuery, setAgenData, setNotification, setModal, setModalType)
    }
    const clearData = () => {
        // Logika untuk menghapus string pencarian
        setSearchQuery('');
        // Anda mungkin juga ingin melakukan pembaruan data atau aksi lainnya setelah menghapus pencarian
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
    };

    const delayedSearch = debounce(constSearchAgen, setSearchTextAlways, 1000);

    return (
        <Animated.View style={[styles.AnimatedView, {
            top: stickyTop,
            opacity: stickyOpacity,
            flex: 1,
            alignItems: 'center'
        }]}>
            <View style={{ borderWidth: 2, flexDirection: 'row', gap: 5, borderRadius: 20, paddingHorizontal: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                    <MaterialIcons name='search' size={24} color={Color.border} />
                </View>
                <TextInput
                    style={{ flex: 1 }}
                    placeholder='Search Agen'
                    value={searchQuery}
                    onChangeText={(text) => {
                        setSearchQuery(text);
                        if (text.length >= 10) {
                            // Pencarian langsung saat panjang teks mencapai 10 karakter atau lebih
                            delayedSearch(text)    
                        }
                    }}
                    onSubmitEditing={submitedit}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        style={styles.clear}
                        onPress={clearData}>
                        <MaterialIcons name='cancel' size={20} color={Color.border} />
                    </TouchableOpacity>
                )}
            </View>
        </Animated.View>
    )
}
export default DynamicHeader


const styles = StyleSheet.create({
    AnimatedView: {
        height: 100,
        backgroundColor: Color.icon,
        position: 'absolute',
        justifyContent: 'flex-end',
        top: -100,
        left: 0,
        right: 0,
        elevation: 3,
        opacity: 1,
        paddingHorizontal: 10
    },
    clear: {
        justifyContent:'center'
    }
})
