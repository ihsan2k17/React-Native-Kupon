import { View, Text, StyleSheet, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData, Animated } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../../constant/color';
import { useNavigation } from '@react-navigation/native';
import { Poppins } from '../../constant/font';
import { handleRefreshListKuponNakami, handleSearchKuponNakami } from '../../../service/fetchKuponNakami';
import { KuponNKM } from '../../../models/kuponNakami';
interface props {
    searchKuponQuery: string;
    setSearchKuponQuery: React.Dispatch<React.SetStateAction<string>>;
    setKuponData: React.Dispatch<React.SetStateAction<KuponNKM[]>>;
    showSearch: boolean;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setGetError: React.Dispatch<React.SetStateAction<string>>;
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>;
}
const HeaderKuponNakamiPage = ({ searchKuponQuery, setSearchKuponQuery, setKuponData, showSearch, setShowSearch, setGetError, setGetModalError }: props) => {
    const navigation = useNavigation();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshAnimation] = useState(new Animated.Value(0));
    const [refreshRotation, setRefreshRotation] = useState(new Animated.Value(0));
    const onSubmitEditing = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const { text } = event.nativeEvent;
        setSearchKuponQuery(text);
        await handleSearchKuponNakami(setKuponData, setSearchKuponQuery, searchKuponQuery);
    };
    return (
        <View>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, alignItems: 'center' }}>
                    <TouchableOpacity style={styles.TouchableBack} onPress={() => { navigation.goBack() }}>
                        <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 25, fontFamily: Poppins.ExtraBold, color: Color.border }}>kupon Nakami</Text>
                    <TouchableOpacity
                        style={styles.TouchableBack}
                        onPress={() => handleRefreshListKuponNakami(setIsRefreshing, refreshAnimation, refreshRotation,
                            setRefreshRotation, setKuponData, setGetError, setGetModalError)}
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
            </View>
            {/* Search */}
            <View style={{ paddingBottom: 10, paddingHorizontal: 20 }}>
                <View style={{
                    flexDirection: 'row',
                    borderWidth: 2,
                    borderRadius: 20,
                    height: 50,
                    alignItems: 'center',
                    borderColor: Color.border
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setShowSearch(!showSearch)}
                        style={{
                            left: 5,
                            height: 40,
                            width: 40,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <MaterialIcons name='search' size={showSearch ? 20 : 24} style={{ color: Color.border }} />
                    </TouchableOpacity>
                    {showSearch && (
                        <TextInput
                            style={styles.inputSearch}
                            placeholder='Search Customer'
                            value={searchKuponQuery}
                            onChangeText={setSearchKuponQuery}
                            onSubmitEditing={onSubmitEditing}
                        />
                    )}
                </View>
            </View>
        </View>
    )
}

export default HeaderKuponNakamiPage

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: Color.icon,
        paddingHorizontal:10
    },
    inputSearch: {
        height: 40,
        width: 280,
        borderRadius: 5,
        marginRight: 10,
    },
    TouchableBack: {
        backgroundColor: Color.border,
        borderRadius: 15,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})