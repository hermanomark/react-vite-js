import api from './client';

export const getAllSets = async (page = 1, itemsPerPage = 10) => {
    try {
        const response = await api.get(`/sets?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`);

        return response.data;
    } catch(error) {
        return error || 'Failed to get sets';
    }
}

export const getSetById = async (id) => {
    try {
        const response = await api.get(`/sets/${id}`);

        if(response.status !== 200) {
            throw new Error('Error fetching set!');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching set:', error);

        throw new Error(error.message || 'Error fetching set!');
    }
}