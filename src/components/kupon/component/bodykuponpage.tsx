import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import Color from '../../constant/color'
import ModalKuponGetError from '../modalkupongeterror'
import Modal from 'react-native-modal'
import RenderKuponItem from '../../../screen/Kupon/renderkuponitem'
import { Kupon } from '../../../models/kupon'

interface props {
    isLoading: boolean;
    getError: string;
    getModalError: boolean;
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>;
    kuponData: Kupon[];
    pointerIndex: number;
    setPointerIndex: React.Dispatch<React.SetStateAction<number>>
}
const BodyKuponPage = ({isLoading, getError, getModalError, setGetModalError, kuponData, pointerIndex, setPointerIndex}: props) => {
  return (
      <View style={{ flex: 1 }}>
          {isLoading ? (
              <ActivityIndicator size="large" color={Color.border} />
          ) : (
              <>
                  {getError ? (
                      <Modal isVisible={getModalError}>
                          <ModalKuponGetError
                              getError={getError}
                              setGetModalError={setGetModalError}
                          />
                      </Modal>
                  ) : (
                      <FlatList
                          data={kuponData}
                          showsHorizontalScrollIndicator={false}
                          maxToRenderPerBatch={5}
                          windowSize={10}
                          contentContainerStyle={{
                              paddingHorizontal: 10,
                              gap: 10,
                              paddingBottom: 10
                          }}
                          renderItem={({ item, index }) => (
                              <RenderKuponItem
                                  item={item}
                                  index={index}
                                  pointerIndex={pointerIndex}
                                  setPointerIndex={setPointerIndex}
                              />
                          )}
                      />
                  )}
              </>
          )}

      </View>
  )
}

export default BodyKuponPage