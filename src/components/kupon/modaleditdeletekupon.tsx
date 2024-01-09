import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Color from '../constant/color'
import { Poppins } from '../constant/font'
import Materialicons  from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigator/rootstack'
import { Kupon } from '../../models/kupon'
import { color } from 'react-native-reanimated'
import { handleDeleteKupon, handleDeleteVoucher } from '../../service/fetchKupon'

interface props {
    setShowVisibleModal: React.Dispatch<React.SetStateAction<boolean>>,
    item: Kupon
}

const ModalEditDeleteKupon = ({ setShowVisibleModal, item }: props) => {
    const showKupon = item.Voucher === 0 || item.Kupon === null;
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [notification, setNotification] = useState('');
    const navigationKupon = useNavigation<StackNavigationProp<RootStackParamList, 'EditKupon'>>();
    const navigationVoucher = useNavigation<StackNavigationProp<RootStackParamList, 'EditVoucher'>>();

    return (
        <View style={{padding:20}}>
            <View style={{ backgroundColor: Color.icon, borderRadius: 10 }}>
                <View style={{ padding: 15 }}>
                    <View style={{ alignItems: 'center', borderRadius: 5 }}>
                        <Image
                            source={require('../../assets/images/update1.png')} style={{ height: 150, width: 225 }} />
                    </View>
                </View>
                {confirmDelete ? (
                    <>
                        {notification ?
                            <>
                                <Text style={styles.textH3}>{notification}</Text>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowVisibleModal(false)
                                            {
                                                showKupon
                                                    ? navigationKupon.reset({ index: 0, routes: [{ name: 'DetailKuponPage' }] })
                                                    : navigationVoucher.reset({ index: 0, routes: [{ name: 'DetailKuponPage' }] });
                                            }
                                        }}
                                        style={styles.buttonEditDelete}>
                                        <Text style={styles.textEditDelete}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </> :
                            <>
                                {
                                    showKupon ? 
                                        <Text style={{ fontSize: 15, fontFamily: Poppins.SemiBold, color: Color.border, textAlign: 'center' }}>
                                            Apakah Anda yakin ingin menghapus Voucher "{item.Voucher}" dari Id {item.ID} ini ?
                                        </Text> : 
                                        <Text style={{ fontSize: 15, fontFamily: Poppins.SemiBold, color: Color.border, textAlign: 'center' }}>
                                            Apakah Anda yakin ingin menghapus Kupon "{item.Kupon}" dari Id {item.ID} ini ?
                                        </Text>
                                }
                                <View style={{ flexDirection: 'row', gap: 10, padding: 10, justifyContent:'center' }}>
                                    <TouchableOpacity
                                        style={[styles.buttonEditDelete, { backgroundColor: showKupon ? Color.border : Color.primary }]}
                                        onPress={() => {
                                            showKupon
                                                ? handleDeleteVoucher(item.ID, item.Poin, item.Voucher, setNotification) 
                                                : handleDeleteKupon(item.ID, item.Poin, item.Kupon, setNotification)
                                         }}>
                                        <Text style={styles.textEditDelete}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.buttonEditDelete, { backgroundColor: showKupon ? Color.border : Color.primary }]}
                                        onPress={() => { setConfirmDelete(false) }}
                                    >
                                        <Text style={styles.textEditDelete}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </>}
                    </>
                ): (
                        <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                            <View style={styles.divContainerWarningandDescription}>
                                <Text style={styles.textH2}>Warning!!!</Text>
                                {showKupon ? (
                                    <Text style={styles.textH3}>Tombol Edit untuk Merubah data Voucher,
                                        Sedangkan Tombol Delete untuk menghapus Data Voucher
                                    </Text>
                                ) : (
                                        <Text style={styles.textH3}>Tombol Edit untuk Merubah data Kupon,
                                            Sedangkan Tombol Delete untuk menghapus Data Kupon
                                        </Text>
                                    )
                                }
                            </View>
                            {/* BUTTON EDIT DELETE */}
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                {/* ingin membuka edit kupon atau voucher berdasarkan jika kupon null maka yang akan kebuka ada edit voucher */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowVisibleModal(false)
                                        if (showKupon) {
                                            navigationVoucher.navigate('EditVoucher', { kuponId: item.ID, kuponPoin: item.Poin, kuponVoucher: item.Voucher });
                                        } else {
                                            navigationKupon.navigate('EditKupon', { kuponId: item.ID, kuponPoin: item.Poin, kuponKupon: item.Kupon });
                                        }
                                    }}
                                    style={[styles.buttonEditDelete, { backgroundColor: showKupon ? Color.border : Color.primary }]}
                                >
                                    <Text style={styles.textEditDelete}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonEditDelete, { backgroundColor: showKupon ? Color.border : Color.primary }]}
                                    onPress={() => {setConfirmDelete(true)}}
                                >
                                    <Text style={styles.textEditDelete}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                )}
            </View>
            <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <TouchableOpacity onPress={() => setShowVisibleModal(false)}
                    style={[styles.buttonClose, { backgroundColor: showKupon ? Color.border : Color.primary }]}>
                    <Materialicons name={'close'} size={24} color={Color.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalEditDeleteKupon
const styles = StyleSheet.create({
    buttonClose: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    textH3: {
        fontSize: 17, fontFamily: Poppins.SemiBold, color: Color.border, textAlign: 'center'
    },
    textH2: {
        fontSize: 24, fontFamily: Poppins.Bold, color: Color.border
    },
    divContainerWarningandDescription: {
        paddingBottom: 10, paddingHorizontal: 7, gap: 20, alignItems: 'center', justifyContent: 'center'
    },
    buttonEditDelete: {
        padding: 10, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10
    },
    textEditDelete: {
        fontSize: 18, fontFamily: Poppins.SemiBold, color: Color.icon
    },
})