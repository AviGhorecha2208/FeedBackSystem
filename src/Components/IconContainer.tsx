import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '../Utils/Colors'
import { moderateScale } from '../Utils/Responsive'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface IconContainerProps {
  name: string
  size?: number
  color?: string
  containerStyle?: ViewStyle
  backgroundColor?: string
  showBorder?: boolean
  borderColor?: string
  onPress?: () => void
}

const IconContainer = ({
  name,
  size = 20,
  color = Colors.primary,
  containerStyle,
  backgroundColor = Colors.cardBackground,
  showBorder = true,
  borderColor = Colors.borderColor,
  onPress,
}: IconContainerProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} activeOpacity={0.7}>
      <View
        style={[
          styles.container,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor,
            width: moderateScale(size + 20),
            height: moderateScale(size + 20),
            borderWidth: showBorder ? moderateScale(1) : 0,
            borderColor: borderColor,
          },
          containerStyle,
        ]}
      >
        <Icon name={name} size={moderateScale(size)} color={color} />
      </View>
    </TouchableOpacity>
  )
}

export default IconContainer

const styles = StyleSheet.create({
  container: {
    // width: moderateScale(40),
    // height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.borderColor,
  },
})
