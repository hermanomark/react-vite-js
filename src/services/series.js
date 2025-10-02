import api from './client';

export const getAllSeries = async (page = 1, itemsPerPage = 10) => {
    try {
        const response = await api.get(`/series?pagination:page=${page}&pagination:itemsPerPage=${itemsPerPage}`);

        return response.data;
    } catch (error) {
        return error || 'Failed to get series!';
    }
}

export const getSeriesById = async (id) => {
    try {
        const response = await api.get(`/series/${id}`);

        return response.data;
    } catch (error) {
        return error || 'Failed to get series by id';
    }
}