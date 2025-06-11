import { Asset } from 'react-native-image-picker'
import APICall from '../Network/ApiCall'
import { EndPoints } from '../Network/EndPoints'
import { AddFeedbackPayload, UploadMediaToAwsResponse } from '../Types/CommonTypes'

const addFeedback = async (payload: AddFeedbackPayload) => {
  try {
    const response = await APICall({
      url: EndPoints.addFeedback,
      method: 'post',
      payload: payload,
    })
    if (response.status === 200) {
      return response.data
    }
    return null
  } catch (error) {
    console.log(error)
  }
}

const uploadMediaToAws = async (payload: Asset) => {
  try {
    const payloadFormatted = {
      file: {
        uri: payload.uri,
        type: payload.type,
        name: payload.fileName,
      },
    }
    const response = await APICall<UploadMediaToAwsResponse>({
      method: 'post',
      url: EndPoints.uploadMediaToAws,
      payload: payloadFormatted,
      formData: true,
    })
    return response?.data?.data
  } catch (error: any) {
    console.log('error in uploadServiceMedia: ', error)
  }
}

export { addFeedback, uploadMediaToAws }
