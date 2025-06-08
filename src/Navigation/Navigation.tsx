import React from 'react'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Screens } from '../Utils/Const'
import {
  StartupScreen,
  DashboardScreen,
  CreateFeedBackScreen,
  PreviewFeedBackScreen,
  FeedBackListScreen,
} from '../Screens'
import { Feedback } from '../Types/CommonTypes'

export type RootStackParamList = {
  StartupScreen: undefined
  Dashboard: undefined
  CreateFeedBack: undefined
  PreviewFeedBack: { feedback: Feedback; isFromCreate: boolean }
  FeedBackList: undefined
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
        <Stack.Screen name={Screens.Dashboard} component={DashboardScreen} />
        <Stack.Screen name={Screens.CreateFeedBack} component={CreateFeedBackScreen} />
        <Stack.Screen name={Screens.PreviewFeedBack} component={PreviewFeedBackScreen} />
        <Stack.Screen name={Screens.FeedBackList} component={FeedBackListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
