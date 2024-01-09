import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../constant/color';
import { Poppins } from '../../constant/font';
import ErrorModalAddAgen from '../modalagen/erroraddagen';
import SuccessModalAddAgen from '../modalagen/successaddagen';
import DropdownSalesId from '../dropdown/dropdownsalesid';
import DropdownKota from '../dropdown/dropdownkota';


interface Props {
  agenId: string; setAgenId: React.Dispatch<React.SetStateAction<string>>;
  agenName: string; setAgenName: React.Dispatch<React.SetStateAction<string>>;
  kota: string; setKota: React.Dispatch<React.SetStateAction<string>>;
  salesId: string; setSalesId: React.Dispatch<React.SetStateAction<string>>;
  modal: boolean; setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: string; setModalType: React.Dispatch<React.SetStateAction<string>>;
  notificationModal: string; setNotificationModal: React.Dispatch<React.SetStateAction<string>>;
}
const FormAddAgen = ({
  agenId, setAgenId, agenName, setAgenName, kota, setKota,
  salesId, setSalesId, modal, setModal,
  modalType, setModalType, notificationModal, setNotificationModal }: Props) => {
  return (
    <View style={{ paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 10 }}>
      <Text style={{ fontFamily: Poppins.Black, fontSize: 25, textAlign: 'center', color: Color.border }}>FORM NEW AGEN</Text>
      <View>
        <View style={styles.divFormContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <MaterialIcons name='devices-other' size={24} color={Color.border} />
            <TextInput
              placeholder="Id Agen *"
              value={agenId !== undefined ? agenId.toString() : '-'}
              keyboardType='name-phone-pad'
              onChangeText={(text) => setAgenId(text)}
              style={{ height: 40, flex: 1, borderBottomWidth: 1 }}
            />
          </View>
        </View>
        <View style={styles.divFormContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <MaterialIcons name='devices-other' size={24} color={Color.border} />
            <TextInput
              placeholder="Nama Agen *"
              value={agenName !== undefined ? agenName.toString() : '-'}
              keyboardType='name-phone-pad'
              onChangeText={(text) => setAgenName(text)}
              style={{ height: 40, flex: 1, borderBottomWidth: 1 }}
            />
          </View>
        </View>
        <View style={styles.divFormContainer}>
          <DropdownKota
            kota={kota}
            setKota={setKota}/>
        </View>
        <View>
          <DropdownSalesId
            salesId={salesId}
            setSalesId={setSalesId}
            setModal={setModal}
            setModalType={setModalType}/>
        </View>
      </View>
      {modal && (
        <Modal isVisible={modal}>
          {modalType === 'success-add-agen' && (
           <SuccessModalAddAgen setModal={setModal} setModalType={setModalType} notificationModal={notificationModal} />
          )}
          {modalType === 'error-add-agen' && (
            <ErrorModalAddAgen setModal={setModal} setModalType={setModalType} notificationModal={notificationModal} />
          )}
        </Modal>
      )}
    </View>
  )
}

export default FormAddAgen
const styles = StyleSheet.create({
  divFormContainer: {
    flex: 1,
    justifyContent: 'space-around',
  }
})