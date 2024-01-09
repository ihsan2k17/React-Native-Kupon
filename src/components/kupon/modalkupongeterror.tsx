import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface props {
    getError: string
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalKuponGetError = ({ getError, setGetModalError }: props) => {
    const closeModal = () => {
        setGetModalError(false);
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                    Error Loading Data
                </Text>
                <Text>{getError}</Text>
                <TouchableOpacity onPress={closeModal} style={{ marginTop: 20 }}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalKuponGetError