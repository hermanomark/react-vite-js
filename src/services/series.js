import api from './client';

export const getAllSeries = async () => {
    try {
        const response = await api.get(`/series`);

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