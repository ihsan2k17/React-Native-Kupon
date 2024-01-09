import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import Color from '../../components/constant/color';
import { Hadiah } from '../../models/hadiah';
import Modal from 'react-native-modal';
import EditDeleteHadiah from '../../components/hadiah/modal/editdeletehadiah';

interface renderProps {
    item: Hadiah,
    index: number,
    categoryIndex: number,
    setCategoryIndex: React.Dispatch<React.SetStateAction<number>>;

}

const Img = '../../assets/images/gift.png'

const RenderItem = ({ item, index, categoryIndex, setCategoryIndex }: renderProps) => {
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
                    backgroundColor: isSelected ? Color.secondary : Color.primary,
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
                        justifyContent:'center'
                    }}>
                        <Image source={require(Img)}
                            style={{
                                width: 52,
                                height:52,
                                aspectRatio: 1,
                                justifyContent: 'center',
                                alignItems:'center'
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
                                paddingBottom:5,
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
                <EditDeleteHadiah setVisibleModal={setVisibleModal} item={item} Barang={item.Barang} />
            </Modal>
        </View>
    );
};

export default RenderItem;
