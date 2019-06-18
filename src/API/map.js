/* eslint-disable import/prefer-default-export */
import API from '@/API'

const API_DISH_SUGGESTION_FOR_MAP = '/v1/dish/suggestions'
export const GET_SUGGESTIONS_AROUND_CENTER_POINT = async ({ lat, lng }) => {
  try {
    const response = await API.post(API_DISH_SUGGESTION_FOR_MAP, {
      latitude: lat,
      longitude: lng
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
