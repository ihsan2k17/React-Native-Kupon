import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Color from '../constant/color'
import Icons from 'react-native-vector-icons/MaterialIcons';

const Search = () => {
  return (
      <View style={{
          flexDirection: 'row',
          paddingHorizontal: 18,
          gap: 12,
      }}>
          <TouchableOpacity style={{
              borderColor: Color.border,
              flex: 1,
              height: 50,
              borderRadius: 52,
              borderWidth: 1,
              alignItems: 'center',
              flexDirection: 'row',
          }}>
              <Icons name="search" size={24} color={Color.border}
                  style={{ opacity: 0.5, paddingLeft:10 }} />
              <Text style={{
                  color: Color.border, flex: 1, fontSize: 16, opacity: 0.5,
              }}>Search</Text>
          </TouchableOpacity>
          {/* TOmbol Filter */}
          <TouchableOpacity
              style={{
                  backgroundColor: Color.border,
                  width: 52,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 52,
              }}>
              <Icons name="tune" size={24} color={Color.icon} />
          </TouchableOpacity>
      </View>
  )
}

export default Search