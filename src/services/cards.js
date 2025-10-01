import api from "./client";

export const getAllCards = async(page = 1, itemsPerPage = 10) => {
 try {
    const response = await api.get(`/cards?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`);

    return response.data; 
 }  catch (error) {
    return error?.message|| 'Failed to get all cards!' ; 
 } 
}

export const getCardById = async (id) => {
    try {
        const response = await api.get(`/cards/${id}`);

        return response.data;
    } catch (error) {
        return error?.message || 'Failed to get card by id!';
    }
}
