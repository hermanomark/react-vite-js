import api from './client';

export const getAllSets = async (page = 1, itemsPerPage = 10, searchName) => {
  try {
    let url = `/sets?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`;
    
    if (searchName) {
      url += `&name=${encodeURIComponent(searchName)}`;
    }
    
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    console.error('Error fetching all sets!:', error);

    throw new Error(error.response?.data?.title || 'Error fetching all sets!');
  }
}

export const getSetById = async (id) => {
  try {
    const response = await api.get(`/sets/${id}`);

    console.log(response)

    return response.data;
  } catch (error) {
    console.error('Error fetching set:', error);

    throw new Error(error.response?.data?.title || 'Error fetching set!');
  }
}

export const getAllCardsInSet = async (id, page = 1, itemsPerPage = 10) => {
  try {
    let url = `/cards?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}&set=eq:${id}`;

    const response = await api.get(url);

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching cards in set:', error);

    throw new Error(error.response?.data?.title || 'Error fetching cards in set!');
  }
}