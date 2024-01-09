import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Color from '../../components/constant/color';
import Modal from 'react-native-modal';
import { HadiahNKM } from '../../models/hadiahNakami';
import EditDeleteHadiahNakami from '../../components/hadiah_nakami/modal/editdeletehadiahNKM';


interface renderProps {
    item: HadiahNKM,
    index: number,
    categoryIndex: number,
    setCategoryIndex: React.Dispatch<React.SetStateAction<number>>;

}

const Img = '../../assets/images/gift.png'

const RenderHadiahNakamiPage = ({item, index, categoryIndex, setCategoryIndex}:renderProps) => {
    const isSelected = categoryIndex === index;
    const [visibleModal, setVisibleModal] = useState(false)

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => setCategoryIndex(index)}
                onLongPress={() => {
                    setVisibleModal(true)
                }}
                style={{
                    backgroundColor: isSelected ? Color.secondary : Color.background,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderColor: Color.primary,
                    borderRadius: 15
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        width: 60,
                        borderRadius: 60,
                        aspectRatio: 1,
                        backgroundColor: Color.icon,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image source={require(Img)}
                            resizeMode='contain'
                            style={{
                                width: 52,
                                height: 52,
                                aspectRatio: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} />
                    </View>
                    <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                        <Text
                            style={{
                                color: isSelected ? Color.blue2Light : Color.text,
                                opacity: isSelected ? 1 : 0.5,
                                fontWeight: '800',
                                fontSize: 18,
                                paddingRight: 50,
                                paddingBottom: 5,
                            }}
                        >
                            {item.Barang}
                        </Text>
                        <Text style={{
                            color: isSelected ? Color.blue2Light : Color.text,
                            opacity: isSelected ? 1 : 0.5,
                            fontWeight: '600',
                            fontSize: 13,
                        }}>Poin: {item.Poin_Hadiah}</Text>
                    </View>
                </View>
                <View>
                    <Text
                        style={{
                            color: isSelected ? Color.blue2Light : Color.text,
                            opacity: isSelected ? 1 : 0.5,
                            fontWeight: '600',
                            fontSize: 15,
                            textAlign: 'right'
                        }}
                    >
                        Periode: {item.Periode}
                    </Text>
                </View>
            </TouchableOpacity>
            <Modal
                isVisible={visibleModal}
                customBackdrop={<View style={{ flex: 1, backgroundColor: Color.border }} />}
                statusBarTranslucent
                backdropTransitionOutTiming={0}
                animationIn='fadeInUp'
                backdropOpacity={0.5}
            >
                <EditDeleteHadiahNakami setVisibleModal={setVisibleModal} item={item} Barang={item.Barang} />
            </Modal>
        </View>
    );
}

export default RenderHadiahNakamiPage

const styles = StyleSheet.create({})