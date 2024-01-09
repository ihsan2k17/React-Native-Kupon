import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { Customer } from '../../models/customer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/rootstack';
import Color from '../../components/constant/color';
import { Poppins } from '../../components/constant/font';

const imagesbg = [
    require('../../assets/images/bg_flat_customer_4.jpg'),
    require('../../assets/images/bg_flat_customer_3.jpg'),
    require('../../assets/images/bg_flat_customer_2.jpg'),
];
interface renderProps {
    item: Customer,
    index: number,
    pointerIndex: number,
    setPointerIndex: React.Dispatch<React.SetStateAction<number>>;
}
const RenderCustomerPage = ({ item, index, pointerIndex, setPointerIndex }: renderProps) => {
    const backgroundImage = imagesbg[index % imagesbg.length]; // Menggunakan modulo untuk mengulang gambar latar belakang
    const isSelected = pointerIndex === index;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handleToCustomerDetail = () => {
        setPointerIndex(index)
        navigation.navigate('DetailCustomerPage',{customerCustomer:item.Customer})
    }
    return (
        <View style={{paddingHorizontal:10
        }}>
            <TouchableOpacity onPress={handleToCustomerDetail}>
                <ImageBackground source={backgroundImage} imageStyle={{
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    height: '100%',
                    width: '100%',
                    opacity:0.9
                }}>
                    <View style={{ padding: 10, flex:1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth:2, borderColor:Color.border}}>
                            <View style={{ width:'75%'}}>
                                <Text style={{ fontFamily: Poppins.SemiBold, fontSize: 16, color: Color.border }}>{item.Customer}</Text>
                            </View>
                            <View style={{width:'25%'}}>
                                <Text style={{ fontFamily: Poppins.SemiBold }}>
                                    Count ID: <Text style={{ fontFamily: Poppins.Bold, fontSize: 20, color: Color.border, paddingHorizontal: 10 }}>{item.TotalCountID}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop:10 }}>
                            <Text style={{ fontFamily: Poppins.Bold, fontSize: 15, color: Color.border }}>{item.Nama}</Text>
                            <Text style={{fontFamily:Poppins.Bold, fontSize:15, color:Color.border}}>{item.HP}</Text>
                        </View>
                        <View style={{justifyContent:'flex-start'}}>
                            <Text style={{ fontFamily: Poppins.SemiBold, fontSize: 14, color: Color.border }}>{item.Alamat}</Text>
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <Text>{item.Email}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

export default RenderCustomerPage;