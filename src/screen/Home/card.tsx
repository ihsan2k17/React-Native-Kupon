import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'

interface cardProps {
    image: ImageSourcePropType;
    nama:string
}

const Card = ({image, nama}: cardProps) => {
  return (
      <View style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24
      }}>
          <Image
              source={image}
              resizeMode='cover'
              style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  height: 300,
                  width: 300
              }}
          />
          <View style={{
              position: 'absolute',
              left: 10,
              top: 10,
              paddingHorizontal: 8,
              paddingVertical: 5,
              backgroundColor: "rgba(0,0,0,0.25)",
              borderRadius:100
          }}>
              <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color:'#fff'
              }}>{nama}</Text>
          </View>
      </View>
  )
}

export default Card