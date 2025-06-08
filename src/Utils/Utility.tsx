import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message'
import { Colors } from './Colors'
import { scale, verticalScale, widthPx } from './Responsive'
import { Fonts } from './Fonts'
import { CommonStylesFn } from './CommonStyles'
import { Platform } from 'react-native'
import { ToastType } from './Const'

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={{ borderLeftColor: Colors.green, height: verticalScale(70), width: widthPx(80) }}
      contentContainerStyle={{ paddingHorizontal: scale(10) }}
      text1Style={[
        CommonStylesFn.text(3, Colors.black, Fonts.medium),
        Platform.OS === 'ios' && { marginBottom: verticalScale(5) },
      ]}
      text2Style={CommonStylesFn.text(3.5, Colors.green)}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={{ borderLeftColor: Colors.error, height: verticalScale(70), width: widthPx(80) }}
      contentContainerStyle={{
        paddingHorizontal: scale(10),
      }}
      text1Style={[
        CommonStylesFn.text(3, Colors.black, Fonts.medium),
        Platform.OS === 'ios' && { marginBottom: verticalScale(5) },
      ]}
      text2Style={CommonStylesFn.text(3.5, Colors.error)}
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text2NumberOfLines={2}
      style={{ borderLeftColor: Colors.info, height: verticalScale(70) }}
      contentContainerStyle={{ paddingHorizontal: scale(10) }}
      text1Style={[
        CommonStylesFn.text(3, Colors.black, Fonts.medium),
        Platform.OS === 'ios' && { marginBottom: verticalScale(5) },
      ]}
      text2Style={CommonStylesFn.text(3, Colors.black, Fonts.medium)}
    />
  ),
}

export const showToast = (type: ToastType, title: string, subTitle?: string) => {
  return Toast.show({
    type,
    text1: title ?? 'Something went wrong',
    ...(subTitle && { text2: subTitle }),
  })
}

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  const saturation = 70 + Math.random() * 30
  const lightness = 45 + Math.random() * 15
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

export const Utility = {
  toastConfig,
  showToast,
  getRandomColor,
}
