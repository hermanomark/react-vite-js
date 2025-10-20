import api from "./client";

export const getAllCards = async (page = 1, itemsPerPage = 10, searchName = '', category = '', rarity = []) => {
  try {
    let url = `/cards?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`;

    if (searchName) {
      url += `&name=${encodeURIComponent(searchName)}`;
    }

    if (category) {
      url += `&category=eq:${encodeURIComponent(category)}`;
    }

    console.log(rarity);

    if (rarity.length > 0) {
      // Add debugging for rarity filtering
      console.log('Filtering by rarities:', rarity);
      console.log('Rarity query string:', rarity.join('|'));

      url += `&rarity=${encodeURIComponent(rarity.join('|'))}`;
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
