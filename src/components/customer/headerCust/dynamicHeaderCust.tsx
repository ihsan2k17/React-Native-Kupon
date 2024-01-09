import { Animated, NativeSyntheticEvent, StyleSheet, TextInput, TextInputSubmitEditingEventData, TouchableOpacity, View } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Color from "../../constant/color"
import { Customer } from "../../../models/customer";
import { FetchCustomerTotalIdCustomer, handleSearchCustomer } from "../../../service/fetchCustomer";

interface dynamicProps {
    scrollY: Animated.Value;
    searching: string;
    setSearching: React.Dispatch<React.SetStateAction<string>>;
    setCustomerData: React.Dispatch<React.SetStateAction<Customer[]>>;
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>;
    setModalCustomer: React.Dispatch<React.SetStateAction<boolean>>;
}
const DynamicHeader = ({scrollY, searching, setSearching, setCustomerData, setModalCustomer, setNotificationModalCustomer}:dynamicProps) => {

    const stickyTop = scrollY.interpolate({
        outputRange: [-110, 0],
        inputRange: [100, 120],
        extrapolate: 'clamp'
    })

    const stickyOpacity = scrollY.interpolate({
        outputRange: [0, 1],
        inputRange: [100, 120],
        extrapolate: 'clamp'
    })

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
        <Animated.View style={[styles.AnimatedView, {
            top: stickyTop,
            opacity: stickyOpacity,
            flex: 1,
            alignItems: 'center',
        }]}>
            <View style={{ paddingVertical: 10 }}>
                <View style={{ borderWidth: 2, flexDirection: 'row', gap: 5, borderRadius: 20, paddingHorizontal: 10, width: '100%' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <MaterialIcons name='search' size={24} color={Color.border} />
                    </View>
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder='Search Customer'
                        value={searching}
                        onChangeText={(text) => setSearching(text)}
                        onSubmitEditing={submitedit}
                    />
                    {searching.length > 0 && (
                        <TouchableOpacity
                            onPress={clearData}
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                            <MaterialIcons name='cancel' size={20} color={Color.border} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Animated.View>
    )
}
export default DynamicHeader;
const styles = StyleSheet.create({
    TouchableBack: {
        backgroundColor: Color.border,
        borderRadius: 15,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    AnimatedView: {
        height: 110,
        backgroundColor: Color.icon,
        position: 'absolute',
        justifyContent: 'flex-end',
        top: -90,
        left: 0,
        right: 0,
        elevation: 3,
        opacity: 1,
        paddingHorizontal: 10
    },
})