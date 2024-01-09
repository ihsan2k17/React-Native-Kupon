import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Color from '../../../components/constant/color'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../navigator/rootstack'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ForgotScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

    return (
        <View style={{
            flex: 1,
            backgroundColor: Color.icon,
            paddingHorizontal: 10,
        }}>
            <StatusBar translucent backgroundColor={'transparent'} />
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Color.icon,
            }}>
                <View style={{}}>
                    <Text>ForgotScreen</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}><Text>Back</Text></TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default ForgotScreen