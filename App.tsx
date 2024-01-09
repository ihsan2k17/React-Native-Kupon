import React, { useMemo } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native'
import RootStack from './src/navigator/rootstack'
import { StatusBar, StyleSheet } from 'react-native'

export default function App () {

  const theme: Theme = useMemo(() => ({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fcf1e2',
      text: '#191919',
      border: '#342205',
      primary: '#fb8900',
      secondary: '#ffc074',
    },
  }),[])
  
  return (
    <GestureHandlerRootView style={style.container}>
      <NavigationContainer>
        <RootStack />
        <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}


const style = StyleSheet.create({
  container: {
    flex: 1,
  }
})
