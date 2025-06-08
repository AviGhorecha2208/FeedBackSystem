import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native'
import React, { memo, useState } from 'react'
import { CommonStylesFn } from '../Utils/CommonStyles'
import { Fonts } from '../Utils/Fonts'
import { Colors } from '../Utils/Colors'
import { moderateScale, scale, verticalScale } from '../Utils/Responsive'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface CommonTextInputProps {
  label?: string
  placeholder?: string
  value?: string | null
  onChangeText?: (text: string) => void
  secureTextEntry?: boolean
  showPasswordToggle?: boolean
  containerStyle?: StyleProp<ViewStyle>
  keyboardType?: KeyboardTypeOptions
  maxLength?: number
  multiline?: boolean
  showClearIcon?: boolean
  onFocus?: () => void
  onBlur?: () => void
  inputStyle?: StyleProp<ViewStyle>
  textColor?: string
}

const CommonTextInput = ({
  label,
  placeholder,
  value = '',
  containerStyle,
  onChangeText,
  secureTextEntry,
  showPasswordToggle,
  keyboardType,
  maxLength,
  multiline,
  showClearIcon,
  onFocus,
  onBlur,
  inputStyle,
  textColor = Colors.black,
}: CommonTextInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const onPressClearIcon = () => {
    onChangeText?.('')
  }
  return (
    <View style={[styles.outerContainer, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, inputStyle]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder={placeholder}
          value={value ?? ''}
          onChangeText={onChangeText}
          editable={!!onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor={Colors.black}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {showPasswordToggle && value && value.length > 0 && (
          <TouchableOpacity
            style={styles.showButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.showButtonText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        )}
        {showClearIcon && value && value.length > 0 && (
          <TouchableOpacity style={styles.showButton} onPress={onPressClearIcon}>
            <Icon name={'close'} size={moderateScale(20)} color={Colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default memo(CommonTextInput)

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
  },
  label: {
    ...CommonStylesFn.text(3.5, Colors.primary, Fonts.medium),
    marginBottom: verticalScale(10),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderColor: Colors.primary,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(10),
    backgroundColor: Colors.accentLight,
    minHeight: verticalScale(40),
  },
  input: {
    flex: 1,
    ...CommonStylesFn.text(3, Colors.white, Fonts.medium),
    padding: 0,
    textAlignVertical: 'center',
    height: '100%',
  },
  showButton: {
    justifyContent: 'center',
  },
  showButtonText: {
    ...CommonStylesFn.text(3, Colors.white, Fonts.medium),
  },
})
