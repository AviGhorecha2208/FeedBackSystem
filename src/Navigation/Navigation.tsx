import React from 'react'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Screens } from '../Utils/Const'
import { StartupScreen, CreateFeedBackScreen } from '../Screens'

export type RootStackParamList = {
  StartupScreen: undefined
  CreateFeedBack: undefined
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

const Navigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={Screens.StartupScreen}
        screenOptions={{ headerShown: false, animation: 'ios_from_right' }}
      >
        <Stack.Screen name={Screens.StartupScreen} component={StartupScreen} />
        <Stack.Screen name={Screens.CreateFeedBack} component={CreateFeedBackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
