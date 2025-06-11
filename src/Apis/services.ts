import APICall from '../Network/ApiCall'
import { EndPoints } from '../Network/EndPoints'

export const getServices = async () => {
  try {
    const response = await APICall({
      url: EndPoints.getServices,
      method: 'get',
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
