import api from './client';

export const getAllSets = async (page = 1, itemsPerPage = 10) => {
  try {
    const response = await api.get(`/sets?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching all sets!:', error);

    throw new Error(error.response?.data?.title || 'Error fetching all sets!');
  }
}

export const getSetById = async (id) => {
  try {
    const response = await api.get(`/sets/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching set:', error);

    throw new Error(error.response?.data?.title || 'Error fetching set!');
  }
}

export const getAllCardsInSet = async (id, page = 1, itemsPerPage = 10) => {
  try {
    const response = await api.get(`/cards?set=${id}&pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching cards in set:', error);

    throw new Error(error.response?.data?.title || 'Error fetching cards in set!');
  }
}