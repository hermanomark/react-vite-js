import api from "./client";

export const getAllCards = async() => {
 try {
    const response = await api.get('/cards');

    return response.data; 
 }  catch (error) {
    return error || 'Failed to get all cards!' ; 
 } 
}

export const getCardById = async (id) => {
    try {
        const response = await api.get(`/cards/${id}`);

        return response.data;
    } catch (error) {
        return error || 'Failed to get card by id!';
    }
}
