import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from '../Utils/Responsive'
import { Colors } from '../Utils/Colors'
import { CommonStylesFn } from '../Utils/CommonStyles'
import { Fonts } from '../Utils/Fonts'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface CommonButtonProps {
  label: string
  textStyle?: TextStyle
  containerStyle?: ViewStyle | ViewStyle[]
  disabledStyle?: ViewStyle
  isDisabled?: boolean
  isLoading?: boolean
  onPress: () => void
  leftIcon?: string
}

const CommonButton = ({
  label = '',
  containerStyle = {},
  textStyle = {},
  isDisabled,
  disabledStyle = {},
  isLoading,
  onPress,
  leftIcon,
}: CommonButtonProps) => {
  return (
    <View style={[styles.container, containerStyle, isDisabled && disabledStyle]}>
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={onPress}
        disabled={isLoading || isDisabled}
      >
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={moderateScale(24)}
            color={Colors.white}
            style={styles.leftIcon}
          />
        )}
        {isLoading ? (
          <ActivityIndicator size={'small'} color={Colors.white} />
        ) : (
          <Text style={[CommonStylesFn.text(4, Colors.white, Fonts.medium), textStyle]}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default CommonButton

const styles = StyleSheet.create({
  container: {
    height: verticalScale(40),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  leftIcon: {
    position: 'absolute',
    left: scale(10),
  },
  touchableContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: scale(10),
  },
})
