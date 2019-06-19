/* eslint-disable import/prefer-default-export */
import API from '@/API'

const API_CONVERT_GEOLOCATION_TO_ADDRESS = '/v1/location/address'
export const CONVERT_GEOLOCATION_TO_ADDRESS = async ({ lat, lng }) => {
  try {
    const response = await API.post(API_CONVERT_GEOLOCATION_TO_ADDRESS, {
      latitude: lat,
      longitude: lng
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
