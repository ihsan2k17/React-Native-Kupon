import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Color from '../../components/constant/color';
import { TouchableOpacity } from 'react-native';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/rootstack';
import { StackNavigationProp } from '@react-navigation/stack';

const Footer = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [isActive, setItActive] = useState(true)
    const handlePress = () => {
        setItActive(!isActive);
        navigation.navigate('BottomSheetScreen');
    };
    return (
        <View>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 25,
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Color.border,
                }}
                activeOpacity={0.5}
                onPress={handlePress}
            >
                <View>
                    <MaterialComunityIcons
                        name={'pencil'}
                        size={24}
                        color={Color.icon} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
