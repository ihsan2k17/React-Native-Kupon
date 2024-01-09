import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Color from '../../constant/color'
import { Materialicons } from '../../constant/materialicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Poppins } from '../../constant/font'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../navigator/rootstack'
import { Hadiah } from '../../../models/hadiah'
import { handletDeleteHadiah } from '../../../service/fetchHadiah'

interface props {
    setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
    item: Hadiah;
    Barang: string
}

const EditDeleteHadiah = ({ setVisibleModal, item, Barang }: props) => {
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [notification, setNotification] = useState('')
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'editHadiahPage'>>();
    return (
        <View style={{ padding: 20 }}>
            <View style={styles.divContainer}>
                <View style={{ padding: 15 }}>
                    <View style={styles.imageContainer}>
                        <Image source={require(`../../../assets/images/update1.png`)} style={styles.imageStyle} />
                    </View>
                </View>
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                    {deleteConfirmation ? (
                        <>
                            {notification ?
                                <>
                                    <Text style={styles.textNotification}>{notification}</Text>
                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setVisibleModal(false)
                                                navigation.reset({
                                                    index: 0,
                                                    routes: [{ name: 'hadiahPage' }],
                                                });
                                            }}
                                            style={styles.buttonEditDelete}>
                                            <Text style={styles.textNotification}>Ok</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                                : <>
                                    <Text style={{ fontSize: 15, fontFamily: Poppins.SemiBold, color: Color.border, textAlign: 'center' }}>
                                        Apakah Anda yakin ingin menghapus hadiah "{item.Barang}" dari List ini ?
                                    </Text>
                                    <View style={{ flexDirection: 'row', gap: 10, paddingTop: 10 }}>
                                        <TouchableOpacity
                                            style={styles.buttonEditDelete}
                                            onPress={() => {
                                                handletDeleteHadiah(Barang, setNotification)
                                            }}>
                                            <Text style={styles.textYesOrNo}>Yes</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.buttonEditDelete}
                                            onPress={() => { setDeleteConfirmation(false) }}
                                        >
                                            <Text style={styles.textYesOrNo}>No</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>}
                        </>
                    ) : (
                            <>
                                <View style={styles.containerText}>
                                    <Text style={styles.heading1}>Warning!!!</Text>
                                    <Text style={styles.heading2}>
                                        Tombol Edit untuk Merubah data Hadiah,
                                        Sedangkan Tombol Delete untuk menghapus Data Hadiah
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setVisibleModal(false)
                                            navigation.navigate('editHadiahPage',{hadiahBarang:item.Barang})
                                        }}
                                        style={styles.buttonEditDelete}
                                    >
                                        <Text style={styles.textEditDelete}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setDeleteConfirmation(true)
                                            //berikan contoh cara agar saat delete dibuang maka modal nya akan berubah tulisan nya menjadi 
                                            //"apkaah anda yakin ingin menghapus hadiah ini ??"
                                        }}
                                        style={styles.buttonEditDelete}>
                                        <Text style={styles.textEditDelete}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </>      
                    )}
                </View>
            </View>
            <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <TouchableOpacity onPress={() => setVisibleModal(false)} style={{
                    padding: 10, justifyContent: 'center', backgroundColor: Color.primary, alignItems: 'center', borderRadius: 25
                }}>
                    <MaterialIcons name={'close'} size={24} color={Color.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditDeleteHadiah

const styles = StyleSheet.create({
    divContainer: {
        backgroundColor: Color.icon, borderRadius: 10
    },
    imageContainer: {
        alignItems: 'center', borderRadius: 5
    },
    imageStyle: {
        height: 150, width: 225
    },
    containerText: {
        paddingBottom: 10,
        paddingHorizontal: 7,
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading1: {
        fontSize: 24,
        fontFamily: Poppins.Bold,
        color: Color.border
    },
    heading2: {
        fontSize: 15,
        fontFamily: Poppins.Regular,
        color: Color.border,
        textAlign: 'center'
    },
    buttonEditDelete: {
        padding: 10,
        width: 100,
        justifyContent: 'center',
        backgroundColor: Color.primary,
        alignItems: 'center',
        borderRadius: 10 
    },
    textEditDelete: {
        fontSize: 18, fontFamily: Poppins.SemiBold, color: Color.icon
    },
    textYesOrNo: {
        fontSize: 18, fontFamily: Poppins.SemiBold, color: Color.icon
    },
    textNotification: {
        fontSize: 15, fontFamily: Poppins.SemiBold, color: Color.border, textAlign: 'center'
    }
    
})