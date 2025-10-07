import api from './client';

export const getAllSeries = async (page = 1, itemsPerPage = 10) => {
    try {
        const response = await api.get(`/series?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`);

        return response.data;
    } catch (error) {
        console.log('Error fetching all series', error);

        throw new Error(error.response?.data?.title || 'Error fetching all series!');
    }
}

export const getSeriesById = async (id) => {
    try {
        const response = await api.get(`/series/${id}`);

        return response.data;
    } catch (error) {
        console.log('Error fetching series', error);
        
        throw new Error(error.response?.data?.title || 'Error fetching series!');
    }
}