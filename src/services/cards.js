import api from "./client";

export const getAllCards = async (page = 1, itemsPerPage = 10, searchName = '', category = '', rarity = [], hpRange = [0, 500], sortBy = '') => {
  try {
    let url = `/cards?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`;

    if (searchName) {
      url += `&name=${encodeURIComponent(searchName)}`;
    }

    if (category) {
      url += `&category=eq:${encodeURIComponent(category)}`;
    }

    if (rarity.length > 0) {
      url += `&rarity=${encodeURIComponent(rarity.join('|'))}`;
    }

    if (hpRange && (hpRange[0] !== 0 || hpRange[1] !== 380)) {
      url += `&hp=gte:${hpRange[0]}`;
      url += `&hp=lte:${hpRange[1]}`;
    }

    if (sortBy) {
      const sortByArr = sortBy.split(':');
      url += `&sort:field=${encodeURIComponent(sortByArr[0])}`;
      url += `&sort:order=${encodeURIComponent(sortByArr[1])}`;
    }

    url += `&image=notnull:`;

    console.log('Fetching cards with URL:', url);

    const response = await api.get(url);

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
