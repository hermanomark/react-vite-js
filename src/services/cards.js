import api from "./client";

export const getAllCards = async (page = 1, itemsPerPage = 10, searchName = '', category = '') => {
  try {
    let url = `/cards?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`;

    if (searchName) {
      url += `&name=${encodeURIComponent(searchName)}`;
    }

    if (category) {
      url += `&category=eq:${encodeURIComponent(category)}`;
    }
    
    url += `&image=notnull:`;

    console.log(url);

    const response = await api.get(url);

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log('Error fetching all cards', error);

    throw new Error(error.response?.data?.title || 'Error fetching all cards!');
  }
}

export const getCardById = async (id) => {
  try {
    const response = await api.get(`/cards/${id}`);

    return response.data;
  } catch (error) {
    console.log('Error fetching card', error);

    throw new Error(error.response?.data?.title || 'Error fetching card!');
  }
}
