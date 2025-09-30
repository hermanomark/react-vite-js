import api from './client';

export const getAllSets = async () => {
    try {
        const response = await api.get('/sets');

        return response.data;
    } catch(error) {
        return error || 'Failed to get sets';
    }
}

export const getSetById = async (id) => {
    try {
        const response = await api.get(`/sets/${id}`);

        return response.data;
    } catch (error) {
        return error || 'Failed to get set by id';
    }
}