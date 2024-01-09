import { View, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import Color from '../../constant/color'
import Modal from 'react-native-modal'
import ModalKuponNKMGetError from '../modalkupongeterrorNKM'
import { KuponNKM } from '../../../models/kuponNakami'
import RenderKuponNakamiItem from '../../../screen/KuponNakami/renderkuponnkm'

interface props {
    isLoading: boolean;
    getError: string;
    getModalError: boolean;
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>;
    kuponData: KuponNKM[];
    pointerIndex: number;
    setPointerIndex: React.Dispatch<React.SetStateAction<number>>
}
const BodyKuponNakamiPage = ({isLoading, getError, getModalError, setGetModalError, kuponData, pointerIndex, setPointerIndex}: props) => {
  return (
      <View style={{ flex: 1 }}>
          {isLoading ? (
              <ActivityIndicator size="large" color={Color.border} />
          ) : (
              <>
                  {getError ? (
                      <Modal isVisible={getModalError}>
                          <ModalKuponNKMGetError
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
                              <RenderKuponNakamiItem
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

export default BodyKuponNakamiPage