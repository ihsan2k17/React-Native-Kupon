import { NavigationProp, useNavigation } from "@react-navigation/native";
import Color from "../../components/constant/color";
import { Poppins } from "../../components/constant/font";
import { KuponNKM } from "../../models/kuponNakami";
import { RootStackParamList } from "../../navigator/rootstack";
import { View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground, StyleSheet, Text } from "react-native";

interface renderProps {
    item: KuponNKM,
    index: number,
    pointerIndex: number,
    setPointerIndex: React.Dispatch<React.SetStateAction<number>>;
}

const RenderKuponNakamiItem = ({ item, index, pointerIndex, setPointerIndex }: renderProps) => {
    const showVoucher = item.JumlahLembarKupon === 0;
    const isSelected = pointerIndex === index;
    const colors = [Color.primary, Color.secondary, Color.blue1Primary, Color.blue3Secondary];
    const colorindeks = index % colors.length;
    const navigate = useNavigation<NavigationProp<RootStackParamList>>();

    const handlePress = async () => {
        console.log(item)
        setPointerIndex(index);
        navigate.navigate('DetailKuponNakamiPage', {
            kuponnakamiId: item.ID,
            kuponnakamiPoin: item.Poin,
            kuponnakamiHadiah: item.Hadiah,
            kuponnakamiUser: item.User_Input,
            kuponnakamiTahun: item.Tahun,
            kuponnakamiPeriode: item.Periode,
            kuponnakamiNamaHadiah: item.Nama_Hadiah
        });
    };

    return (
        <View style={{}}>
            <TouchableOpacity
                activeOpacity={1}
                style={[
                    style.CardTouchable1, {
                        backgroundColor: isSelected ? 'white' : colors[colorindeks]
                    }]}
                onPress={handlePress}>
                <ImageBackground
                    source={require('../../assets/images/bg_flat3.jpg')}
                    imageStyle={style.cardImageContainer}
                    style={{ padding: 10 }}
                >
                    <View style={[style.cardHeader]}>
                        <Text style={[style.styleTextCustomer, { color: isSelected ? Color.border : 'white' }]}>{item.NamaCustomer}</Text>
                        <Text style={[style.styleTextID, { color: isSelected ? Color.border : 'white' }]}>ID: {item.ID}</Text>
                    </View>
                    <View style={style.cardBody1}>
                        <Text style={[style.styleTextNamaHadiah, { color: isSelected ? Color.border : 'white' }]}>{item.Nama_Hadiah}</Text>
                    </View>
                    <View style={style.cardBody2}>
                        <Text style={[style.styleTextTotalPoin, { color: isSelected ? Color.border : 'white' }]}>TOTAL POIN: {item.TotalPoin}</Text>
                        <Text style={[style.styleTextPoin, { color: isSelected ? Color.border : 'white' }]}>POIN: {item.Poin}</Text>
                        <Text style={[style.styleTextHadiah, { color: isSelected ? Color.border : 'white' }]}>HADIAH: {item.Hadiah}</Text>
                    </View>
                    <View style={style.cardBody3}>
                        <View>
                            <Text style={[style.styleTextJenis, { color: isSelected ? Color.border : 'white' }]}>{item.Jenis}</Text>
                            <Text style={[style.styleTextPeriode, { color: isSelected ? Color.border : 'white' }]}>Periode: {item.Periode}</Text>
                        </View>
                        <View>
                            <Text style={[style.styleTextLembar, { color: isSelected ? Color.border : 'white' }]}>{showVoucher ? item.JumlahLembarVoucher : item.JumlahLembarKupon} Lembar</Text>
                            <Text style={[style.styleTextPeriode, { color: isSelected ? Color.border : 'white' }]}>Tahun : {item.Tahun}</Text>
                        </View>
                    </View>
                </ImageBackground>

            </TouchableOpacity>
        </View>
    )
};
export default RenderKuponNakamiItem;

const style = StyleSheet.create({
    CardTouchable1: {
        borderRadius: 20,
        gap: 10,
    },
    styleTextCustomer: {
        fontSize: 20,
        fontFamily: Poppins.Bold
    },
    styleTextID: {
        fontSize: 15,
        fontFamily: Poppins.Bold,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardImageContainer: {
        opacity: 0.4,
        borderRadius: 20,
        backgroundColor: Color.border,
    },
    cardBody1: {
        flexDirection: 'column',
        gap: 5,
        alignItems: 'center'
    },
    styleTextNamaHadiah: {
        fontSize: 20,
        fontFamily: Poppins.Black,

    },
    cardBody2: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    styleTextTotalPoin: {
        fontSize: 14,
        fontFamily: Poppins.Black,
    },
    styleTextPoin: {
        fontSize: 15,
        fontFamily: Poppins.Bold,
    },
    styleTextHadiah: {
        fontSize: 14,
        fontFamily: Poppins.Bold,
    },
    cardBody3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    styleTextJenis: {
        fontSize: 15,
        fontFamily: Poppins.Bold,
    },
    styleTextLembar: {
        fontSize: 14,
        fontFamily: Poppins.Bold,
    },
    styleTextPeriode: {
        fontSize: 14,
        fontFamily: Poppins.Bold
    }
})