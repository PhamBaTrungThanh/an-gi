/* eslint-disable import/prefer-default-export */
import API from '@/API'

const API_SEARCH_FOR_DISHES = '/v1/dish/search'
export const SEARCH_FOR_DISHES_BY_QUERY = async ({ query, lat, lng }) => {
  try {
    const response = await API.post(API_SEARCH_FOR_DISHES, {
      latitude: lat,
      longitude: lng,
      query: query
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
