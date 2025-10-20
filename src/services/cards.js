import api from "./client";

export const getAllCards = async (page = 1, itemsPerPage = 10, searchName = '', category = '', rarity = [], hpRange = [0, 300]) => {
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

//     Greater or Equal	gte: hp = gte: 50	Elements with more or equal than the value
// Lesser or Equal	lte: hp = lte: 50

    if (hpRange && (hpRange[0] !== 0 || hpRange[1] !== 300)) {
      url += `&hp=gte:${hpRange[0]}`;
      url += `&hp=lte:${hpRange[1]}`;
    }

    url += `&image=notnull:`;

    const response = await api.get(url);

    console.log(url);

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
