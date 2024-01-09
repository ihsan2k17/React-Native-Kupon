import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/rootstack';
import Modal from 'react-native-modal';
import renderModalContent from './modalmenu';

interface CategoryCardProps {
    image: ImageSourcePropType;
    nama: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, nama }) => {

    const [ratio, setRatio] = useState(0);
    const [modal, setModal] = useState(false);
    const [menuType, setMenuType] = useState('')

    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'salesPage'|'customerPage'|'hadiahPage'|'KuponPage'|'AgenPage'>>()
    
    const handlePress = () => {
        if (nama === 'sales') {
            navigation.navigate('salesPage');
        } else if (nama === 'customer' || nama === 'hadiah' || nama === 'kupon') {
            Dropdown();
            /*jika handle press yang ditekan adalah bagian customer, hadiah, ataupun kupon
            maka akan membuka dropdown modal, yang selanjutnya akan diteruskan ke file modalmenu.tsx*/
        } else if (nama === 'agen') {
            navigation.navigate('AgenPage');
        }
    };

    const Dropdown = () => {
        setMenuType(nama)
        setModal(true);
    };

    

    return (
        <View>
            <TouchableOpacity onPress={handlePress} activeOpacity={1}>
                {/* Konten Card */}
                <View
                    style={{
                        aspectRatio: ratio === 0 ? 1 : 1,
                        position: 'relative',
                        overflow: 'hidden',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={image}
                        resizeMode="cover"
                        style={{
                            height: 180,
                            width: 180,
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            left: 15,
                            top: 10,
                            paddingHorizontal: 8,
                            paddingVertical: 5,
                            backgroundColor: 'rgba(0,0,0,0.25)',
                            borderRadius: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '700',
                                color: 'white',
                            }}
                        >
                            {nama}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* Modal */}
            <Modal isVisible={modal}>{renderModalContent({menuType, setModal, navigation})}</Modal>
        </View>
    );
};
export default CategoryCard